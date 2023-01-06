import { classNames } from "../const";

export enum TextTypes {
  Body,
  ButtonText,
  SubText,
  BoldSubText,
  LargeButton,
  LargeButtonBlue,
  NavText,
  BodySubText,
  TextHeader,
  TriText,
  // BoldBody,
}

const TextTypesMap: Record<TextTypes, string> = {
  [TextTypes.Body]: "font-light  text-base text-white ",
  [TextTypes.LargeButton]: "text-md md:text-lg lg:text-xl text-bold	 text-white",
  [TextTypes.LargeButtonBlue]:
    "text-2xl md:text-4xl lg:text-4xl xl:text-5xl xxl:text-6xl	 text-green",
  [TextTypes.ButtonText]:
    "font-light   md:text-[24px] md:leading-[36px] text-white",
  [TextTypes.SubText]: "font-textRegular text-base",
  [TextTypes.TriText]: "font-textRegular text-sm text-lightGray",

  [TextTypes.BoldSubText]: "font-textRegular text-2xl font-medium ",
  [TextTypes.NavText]: "text-xl  font-textRegular font-medium",
  [TextTypes.BodySubText]: "text-3xl font-normal font-textRegular",
  [TextTypes.TextHeader]:
    "text-2xl font-sm md:text-3xl md:font-medium font-textRegular",
  // [TextTypes.BoldBody]: "font-bold md:text-[24px] md:leading-[36px] ",
};

type TextProps = TemplateText & {
  type: TextTypes;
};

const Text = (props: TextProps) => {
  return (
    <p
      onClick={props.onClick}
      className={classNames(" ", props.customClass, TextTypesMap[props.type])}
    >
      {props.children}
    </p>
  );
};

type TemplateText = {
  children: string | number;
  customClass?: string;
  onClick?: () => void;
};

export const TextHeader = ({
  customClass,
  children,
  onClick,
}: TemplateText) => {
  return (
    <Text
      onClick={onClick}
      type={TextTypes.TextHeader}
      customClass={customClass}
    >
      {children}
    </Text>
  );
};

export const NavText = ({ children, customClass, onClick }: TemplateText) => {
  return (
    <Text type={TextTypes.NavText} customClass={customClass} onClick={onClick}>
      {children}
    </Text>
  );
};

export const BodySubText = ({
  children,
  customClass,
  onClick,
}: TemplateText) => {
  return (
    <Text
      type={TextTypes.BodySubText}
      customClass={customClass}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

export default Text;
