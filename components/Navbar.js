import Link from 'next/link';
import Image from 'next/Image';
import logo from '../public/disney.svg';

const Navbar = ({ account }) => {
  return (
    <div className="navbar">
      <Link href="/"><Image src={logo} alt={"Disney Logo"} width={120} height={50}></Image></Link>
      <div className="account-info">
        <p className="username">{account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  );
}

export default Navbar;
