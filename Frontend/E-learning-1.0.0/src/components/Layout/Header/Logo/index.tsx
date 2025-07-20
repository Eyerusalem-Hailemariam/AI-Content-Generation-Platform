import logo from "../../../../../public/images/writeAi.png";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="logo"
        width={48}
        height={48}
        style={{ width: "48px", height: "48px" }}
        quality={100}
      />
    </Link>
  );
};

export default Logo;
