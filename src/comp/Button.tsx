import { classNames } from "../const";
import Text, { TextTypes } from "./Text";
export enum ButtonTypes {
  Primary,
  Secondary,
  Nav,
}

import Image from "next/image";
const ButtonTypeMaps: Record<ButtonTypes, string> = {
  [ButtonTypes.Primary]: " py-4 px-4  min-w-[240px] lg:min-w-[330px]",
  [ButtonTypes.Secondary]: "py-2 px-8 min-w-[200px]",
  [ButtonTypes.Nav]: "py-2 px-8 rounded-lg py-1.5 px-5 ",
};

export enum ButtonColors {
  Green,
  Gold,
  GreenGradient,
  YelloGradient,
  Gray,
  DarkGray,
}

const ButtonColorMaps: Record<ButtonColors, string> = {
  [ButtonColors.Green]: "bg-green",
  [ButtonColors.Gold]: "bg-gold",
  [ButtonColors.GreenGradient]: "bg-gradient-to-r from-lightGreen to-darkGreen",
  [ButtonColors.YelloGradient]:
    "bg-gradient-to-r from-lightYellow to-darkYellow",
  [ButtonColors.Gray]: "bg-gray",
  [ButtonColors.DarkGray]: "bg-darkGray",
};

// type interface
type ButtonProps = TemplateButton & {
  type: ButtonTypes;
  color: ButtonColors;
};

const Button = (props: ButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "cursor-pointer   m-auto hover:shadow-xl text-center transition-all",
        ButtonTypeMaps[props.type],
        ButtonColorMaps[props.color],
        props.customClass
      )}
    >
      {props.type === ButtonTypes.Primary ? (
        <Text customClass="!font-bold" type={TextTypes.LargeButton}>
          {props.children}
        </Text>
      ) : (
        <Text customClass="!font-bold" type={TextTypes.ButtonText}>
          {props.children}
        </Text>
      )}
    </div>
  );
};

type CustomNavButtonProps = TemplateButton & {
  route?: string;
};
export const CustomNavButton = ({
  onClick,
  customClass,
  children,
  route,
}: CustomNavButtonProps) => {
  const handleButtonClick = () => {
    window.open(route, "_blank");
  };
  return (
    <Button
      type={ButtonTypes.Nav}
      color={ButtonColors.GreenGradient}
      onClick={handleButtonClick}
      customClass={customClass}
    >
      {children}
    </Button>
  );
};
type ButtonIconProps = TemplateButton & {
  type: ButtonTypes;
  color: ButtonColors;
  icon: any;
};

export const IconButton = (props: ButtonIconProps) => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "cursor-pointer flex flex-row items-center gap-5  m-auto hover:shadow-xl text-center transition-all",
        ButtonTypeMaps[props.type],
        ButtonColorMaps[props.color],
        props.customClass
      )}
    >
      <Image src={props.icon} alt="Icon" width={20} height={20} />
      {props.type === ButtonTypes.Primary ? (
        <Text customClass="!font-bold" type={TextTypes.LargeButton}>
          {props.children}
        </Text>
      ) : (
        <Text customClass="!font-bold" type={TextTypes.ButtonText}>
          {props.children}
        </Text>
      )}
    </div>
  );
};
type TemplateButton = {
  customClass?: string;
  children: string;
  onClick?: () => void;
};
export const NavButton = ({
  children,
  customClass,
  onClick,
}: TemplateButton) => {
  return (
    <Button
      type={ButtonTypes.Nav}
      color={ButtonColors.GreenGradient}
      onClick={onClick}
      customClass={customClass}
    >
      {children}
    </Button>
  );
};

export const StakingHistoryButton = ({
  children,
  customClass,
  onClick,
}: TemplateButton) => {
  return (
    <Button
      type={ButtonTypes.Nav}
      color={ButtonColors.GreenGradient}
      onClick={onClick}
      customClass={customClass + ""}
    >
      {children}
    </Button>
  );
};

export const TileButton = ({
  children,
  customClass,
  onClick,
}: TemplateButton) => {
  return (
    <Button
      type={ButtonTypes.Nav}
      color={ButtonColors.YelloGradient}
      onClick={onClick}
      customClass={customClass + " min-w-[240px]"}
    >
      {children}
    </Button>
  );
};

export const TileButtonGray = ({
  children,
  customClass,
  onClick,
}: TemplateButton) => {
  return (
    <Button
      type={ButtonTypes.Nav}
      color={ButtonColors.DarkGray}
      onClick={onClick}
      customClass={customClass + "w-[260px]"}
    >
      {children}
    </Button>
  );
};

export const FilterButton = ({
  children,
  customClass,
  onClick,
  active,
}: TemplateButton & { active: boolean }) => {
  if (active) {
    return (
      <Button
        type={ButtonTypes.Nav}
        color={ButtonColors.YelloGradient}
        onClick={onClick}
        customClass={customClass + " !m-0"}
      >
        {children}
      </Button>
    );
  } else {
    return (
      <Text
        onClick={onClick}
        customClass="!font-bold"
        type={TextTypes.ButtonText}
      >
        {children}
      </Text>
    );
  }
};

export const ModelButton = (props: ButtonProps) => {
  return (
    <div
      onClick={props.onClick}
      className={classNames(
        "cursor-pointer   m-auto hover:shadow-xl text-center transition-all",
        ButtonTypeMaps[props.type],
        ButtonColorMaps[props.color],
        props.customClass
      )}
    >
      <Text customClass="text-white" type={TextTypes.SubText}>
        {props.children}
      </Text>
    </div>
  );
};

export default Button;
