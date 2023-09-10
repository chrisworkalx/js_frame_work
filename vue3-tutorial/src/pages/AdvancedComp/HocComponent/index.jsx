import { h, defineComponent, ref, onMounted } from 'vue';
import { ElButton } from 'element-plus';
import PopsTransfer from './businessComp/PopsTransfer.vue';
import LoadingStatus from './businessComp/LoadingStatus.vue';
import AuthButtonDir from './businessComp/AuthButton-dir.vue';
import BaseExtend from './baseComp/baseExtend.vue';
import HocExtend from './baseHoc/HocExtend';
import BaseHocOne from './baseHoc/HocOne';
import BaseHocTwo from './baseHoc/HocTwo';
import HocAuth from './baseHoc/HocAuth';
import HocSlot from './baseHoc/HocSlot';

const HocPopsTransfer = BaseHocOne(PopsTransfer);
const HocLoadingStatus = BaseHocTwo(LoadingStatus);
const HocAthButton = HocAuth(ElButton); //我们假设这个button组件是后来封装的
const list = Array(5)
  .fill('')
  .map((_, index) => ({ type: '品种' + (index + 1), id: index }));
export default {
  name: 'HocComponent',
  setup() {
    const isLargerThanFifty = () => Math.random() * 100 > 50;
    const isLoading = ref(true);
    const listData = ref([]);
    const setLoading = (time = 2000) => {
      return new Promise((res, rej) =>
        setTimeout(() => {
          if (isLargerThanFifty()) {
            res(list);
          } else {
            rej('fail');
          }
        }, time)
      );
    };
    onMounted(async () => {
      //假设这里是一个请求，我们没有对request做一个全局管控loading，类似axios可以在拦截器中实现
      //这里只是做一个功能展示
      try {
        const res = await setLoading();
        isLoading.value = false;
        listData.value = res;
      } catch (e) {
        // console.log('e', e);
        isLoading.value = false;
        alert('小于50!');
      }
    });
    return () => {
      return (
        <div>
          <HocPopsTransfer text="great" />
          <HocLoadingStatus isLoading={isLoading.value} list={listData.value} />
          <left-title title="权限鉴权">
            <AuthButtonDir permission="OPERATOR_ROLE" title="下一步" />
            <AuthButtonDir permission="ADMIN_ROLE" title="审核" />
            <HocAthButton title="查看" type="info">
              {/* 测试插槽透传 */}
              <span style={{ color: 'red' }}>view</span>
            </HocAthButton>
            <HocAthButton permission="FUHE_ROLE" title="复核" />
          </left-title>
          {/* jsx中使用具名插槽 */}
          <BaseExtend
            v-slots={{
              default: () => <>这是默认插槽1</>,
              dynamic: () => <>dynamic1</>
            }}
          />
          <HocExtend
            v-slots={{
              // dynamic: () => {
              //   //在这里重写slot:dynamic
              //   return (
              //     <div>
              //       <span>goods</span>
              //     </div>
              //   );
              // },
              dynamic_one: (props) => {
                // console.log(props, '------prop');
                return (
                  <>
                    <span>Dynamic_Hoc_extend</span>
                    <span>🌞</span>
                    <span>{props?.user}</span>
                  </>
                );
              },
              list: (props) => {
                return (
                  <div>
                    <span>{props?.goods.name}</span>
                    <span>⬅️🐯➡️</span>
                    <span>{props?.goods.price}</span>
                  </div>
                );
              }
            }}
          >
            <span>默认插槽2</span>
          </HocExtend>
          <HocSlot
            v-slots={{
              dynamic: (props) => {
                return (
                  <p style={{ background: '#f40', color: '#fff' }}>
                    年龄：{props.age}
                  </p>
                );
              }
            }}
          ></HocSlot>
        </div>
      );
    };
  }
};
