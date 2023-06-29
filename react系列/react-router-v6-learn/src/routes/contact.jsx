/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Form, useLoaderData, useFetcher } from 'react-router-dom';
import { getContact, updateContact } from '../contacts';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found'
    });
  }
  return { contact };
}

export async function action({ request, params }) {
  let formData = await request.formData();
  console.log('formData', formData);
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true'
  });
}

export default function Contact() {
  const { contact } = useLoaderData();

  // const contact = {
  //   first: 'Your',
  //   last: 'Name',
  //   avatar: 'https://placekitten.com/g/200/200',
  //   twitter: 'your_handle',
  //   notes: 'Some notes',
  //   favorite: true
  // };

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* //没有method属性不用掉路由配置表action方法 */}
          {/* 没有配置的method位get 或者不写直接拼接路由路径跳转 */}
          {/* <Form action="edit" method="post｜put ｜ delete ｜ patch等"> */}
          <Form action="edit">
            {' '}
            {/*直接跳转*/}
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ contact }) {
  // yes, this is a `let` for later
  const fetcher = useFetcher(); //此时并不想去跳转路由 只是做一些数据处理
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
