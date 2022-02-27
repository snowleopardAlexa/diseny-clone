import Link from 'next/link';
import Image from 'next/Image';
import logo from '../public/disney.svg';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href="/">
        <Image src={logo} alt={"Disney Logo"} width={120} height={50}></Image>
      </Link>
    </div>
  );
}

export default Navbar;
