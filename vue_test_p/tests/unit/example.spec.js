/**
 * @Description  :
 * @Version      : 1.0
 * @Author       : mingfei.yao
 * @Date         : 2023-01-29 15:35:09
 * @LastEditors  : mingfei.yao
 * @LastEditTime : 2023-01-29 16:32:41
 * @FilePath     : \\js_frame_work\\vue_test_p\\tests\\unit\\example.spec.js
 * @Copyright (C) 2023 mingfei.yao. All rights reserved.
 */
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    console.log("wrapper", wrapper);
    expect(wrapper.text()).toMatch(msg);
  });
});
