/* eslint-disable react-refresh/only-export-components */
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit
} from 'react-router-dom';
import { getContacts, createContact } from '../contacts';
import { useEffect } from 'react';

export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

// export async function loader() {
//   const contacts = await getContacts();
//   return { contacts };
// }

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const contacts = await getContacts(q);
  return { contacts, q };
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  console.log('contacts', contacts);
  const navigation = useNavigation();
  // useNavigation returns the current navigation state: it can be one of "idle闲置】" | "submitting【正在提交】" | "loading【正在加载】".

  console.log(navigation.state, '===navigation.state');

  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has('q');

  useEffect(() => {
    document.getElementById('q').value = q; //浏览器回退或者前进保存的输入框值
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                //onchange事件去触发浏览器端url响应
                // submit(event.currentTarget.form); //会触发Form请求route loader加载

                const isFirstSearch = q == null;
                console.log('isFirstSearch', isFirstSearch);
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch //这样操作是减少不必要存储在浏览器历史记录
                });
              }}
            />
            {/* 输入框左侧loading icon */}
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* <form method="post">
            <button type="submit">New</button>
          </form> */}

          {/* 没写action字段表示不会去拼接路由 只是调用当前页面的路由配置的action方法 */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          <ul>
            <li>
              {/* a标签会强制刷新，导致页面请求都会重新加载，性能不好，
              使用Link组件可以实现单页面效果 */}
              {/* <a href={`/contacts/1`}>Your Name</a> */}
              <Link to={`/contacts/1`}>Your Name</Link>
            </li>
            <li>
              {/* <a href={`/contacts/2`}>Your Friend</a> */}
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                  {/* <Link to={`contacts/${contact.id}`}>
                  {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </Link> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        {/* Outlet相当于路由插槽 */}
        <Outlet />
      </div>
    </>
  );
}
