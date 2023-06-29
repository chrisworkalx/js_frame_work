/* eslint-disable no-unreachable */
import { redirect } from 'react-router-dom';
import { deleteContact } from '../contacts';

export async function action({ params }) {
  //特意抛错测试崩溃情况
  // throw new Error('oh dang!');
  await deleteContact(params.contactId);
  return redirect('/');
}
