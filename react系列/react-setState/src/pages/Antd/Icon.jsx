import { Button } from 'antd';
import BorderInnerOutlined from '@ant-design/icons/BorderInnerOutlined';
import { BorderInnerOutlined as BorderInnerOutlinedCopy } from '@ant-design/icons';

export default function IconComp() {
  return (
    <>
      <Button type="primary">Button</Button>
      <BorderInnerOutlined />
      <BorderInnerOutlinedCopy />
    </>
  );
}
