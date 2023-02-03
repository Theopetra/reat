import Image from "next/image";
import { ButtonColors, ButtonTypes, IconButton, NavButton } from "./Button";
import { NavText } from "./Text";
import { useRouter } from "next/router";
import { useConnect } from "@stacks/connect-react";
import { useAppState } from "../state";
import { isMobile } from "react-device-detect";
import BlockDate from "./BlockDate";

export const NAV_HEIGHT = "130PX";
export const NAV_HEIGHT_OFFSET = "230PX";

const Nav = () => {
  const router = useRouter();

  const {
    currentBlockHeight,
    senderAddress,
    authenticated,
    _authenticated,
    _senderAddress,
  } = useAppState();
  const { doOpenAuth } = useConnect();

  const handleAuth = () => {
    doOpenAuth();
  };

  const handleLogout = () => {
    _authenticated(false);
    _senderAddress(undefined);

    localStorage.removeItem("principal");
  };

  return (
    <div
      style={{
        height: NAV_HEIGHT,
        position: "absolute",
      }}
      className="w-screen relative z-40 flex flex-col lg:flex-row items-center justify-between bg-transparent p-4 2xl:px-48  max-w-[1800px]"
    >
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer flex flex-row"
      >
        <Image
          src={"/images/REAT-logo.png"}
          alt="REAT Logo"
          height={129}
          width={129}
        />

        <div className="flex flex-row items-center gap-2.5">
          {currentBlockHeight && (
            <div
              style={{
                borderRadius: "2px",
                width: "12px",
                height: "12px",
                backgroundColor: "#54930E",
              }}
            />
          )}
          <NavText customClass="text-lightGreen">
            {BlockDate(currentBlockHeight)}
          </NavText>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-1 md:gap-10">
        <div className="flex flex-row items-center  gap-6  md:gap-10">
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
        </div>

        {authenticated && (
          <div className="flex flex-row gap-5">
            <NavText customClass="text-lightGreen">
              {senderAddress
                ? `${senderAddress.substring(0, 4)}...${senderAddress.substring(
                    senderAddress.length - 4
                  )}`
                : ""}
            </NavText>
            <NavText
              onClick={() => handleLogout()}
              customClass="text-darkGreen cursor-pointer underline"
            >
              Logout
            </NavText>
          </div>
        )}

        {!authenticated && (
          <NavButton customClass="mt-4 md:mt-0" onClick={() => handleAuth()}>
            Connect
          </NavButton>
        )}
      </div>
    </div>
  );
};

export const Footer = () => {
  const hanldeTwitter = () => {
    window.open("https://twitter.com/REATprotocol", "_blank");
  };
  return (
    <div className="w-screen  relative z-10  bg-white ">
      <div className="w-full flex flex-row items-center justify-between max-w-[1800px] m-auto p-4 2xl:px-48 gap-10">
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
            Real Equality for America Today
          </NavText>
        </div>

        <div className=" hidden md:flex flex-col md:flex-row space-between items-center gap-10">
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
