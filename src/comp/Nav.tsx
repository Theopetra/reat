import Image from "next/image";
import { ButtonColors, ButtonTypes, IconButton, NavButton } from "./Button";
import { NavText } from "./Text";
import { useRouter } from "next/router";

export const NAV_HEIGHT = "130PX";
export const NAV_HEIGHT_OFFSET = "230PX";

const Nav = () => {
  const router = useRouter();

  return (
    <div
      style={{
        height: NAV_HEIGHT,
        position: "absolute",
      }}
      className="w-screen relative z-40 flex flex-row items-center justify-between bg-transparent p-4 2xl:px-40  max-w-[1800px]"
    >
      <div onClick={() => router.push("/")} className="cursor-pointer">
        <Image
          src={"/images/REAT-logo.png"}
          alt="REAT Logo"
          height={129}
          width={129}
        />
      </div>

      <div className="flex flex-row items-center gap-10">
        <NavText
          onClick={() => router.push("/donate")}
          customClass="text-white cursor-pointer"
        >
          DONATE
        </NavText>
        <NavText
          onClick={() => router.push("/stack")}
          customClass="text-white cursor-pointer"
        >
          STACK
        </NavText>
        <NavText
          onClick={() => router.push("/claim")}
          customClass="text-white cursor-pointer"
        >
          CLAIM
        </NavText>
        <NavButton>Connect</NavButton>
      </div>
    </div>
  );
};

export const Footer = () => {
  const hanldeTwitter = () => {};
  return (
    <div className="w-screen  relative z-10  bg-white ">
      <div className="w-full flex flex-row items-center justify-between max-w-[1800px] m-auto p-4 2xl:px-40 gap-10">
        <div className="flex flex-row items-center gap-2">
          <Image
            width={125}
            height={125}
            src={"/images/REAT-logo-footer.png"}
            alt="REAT Logo"
          />
          <div
            style={{
              height: "60px",
              width: "1px",
              backgroundColor: "#000000",
              borderRadius: "8px",
            }}
          />
          <NavText customClass="text-black">
            Real Equity for America Today
          </NavText>
        </div>
        <div className="flex flex-row space-between items-center gap-10">
          <IconButton
            type={ButtonTypes.Nav}
            color={ButtonColors.GreenGradient}
            onClick={() => hanldeTwitter()}
            icon={"/images/twitter.svg"}
          >
            Follow Us on Twitter
          </IconButton>
          <IconButton
            type={ButtonTypes.Nav}
            color={ButtonColors.GreenGradient}
            onClick={() => hanldeTwitter()}
            icon={"/images/document.svg"}
          >
            Read Our White Paper
          </IconButton>
        </div>
      </div>
    </div>
  );
};
export default Nav;
