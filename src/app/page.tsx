import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/prototype/example-dashboard');
  return null;
}
