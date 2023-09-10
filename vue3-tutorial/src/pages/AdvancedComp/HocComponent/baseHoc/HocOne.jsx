export default function HocOne(Comp) {
  const userInfo = {
    username: 'chrisworkalx',
    hobbies: ['eat', 'playing']
  };

  // return setup(props, { attrs, emit, expose, slots }) {},
  return ({ ...defaultProps }) => {
    return <Comp user={userInfo} {...defaultProps} />;
  };
}
