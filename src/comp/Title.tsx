import { classNames } from "../const";

export enum TitleTypes {
  empty,
  Header,
  SubHeader,
  TriHeader,
  RaxHeader,
  ModelHeader,
}
//md:text-[50px] md:leading-[75px]
const TitleTypeMaps: Record<TitleTypes, string> = {
  [TitleTypes.empty]: "",
  [TitleTypes.Header]:
    "text-white text-[160px] tracking-[0.4em] font-headerBold",
  [TitleTypes.SubHeader]: "text-white font-[100px] RaxtorRegular ",
  [TitleTypes.TriHeader]: "text-white font-[50px] RaxtorRegular ",
  [TitleTypes.RaxHeader]:
    "text-white text-[200px] tracking-[0.4em] font-headerRax",
  [TitleTypes.ModelHeader]: "font-headerBold text-3xl",
};

type Title = TemplateTitle & {
  type: TitleTypes;
};
const Title = (props: Title) => {
  return (
    <p
      className={classNames(
        "font-button font-bold  text-white ",
        TitleTypeMaps[props.type],
        props.customClass || ""
      )}
    >
      {props.children}
    </p>
  );
};

export default Title;

type TemplateTitle = {
  children: string;
  customClass?: string;
};

export const RaxHeader = ({ customClass, children }: TemplateTitle) => {
  return (
    <Title type={TitleTypes.RaxHeader} customClass={customClass}>
      {children}
    </Title>
  );
};

export const TitleHeader = ({ customClass, children }: TemplateTitle) => {
  return (
    <Title type={TitleTypes.Header} customClass={customClass}>
      {children}
    </Title>
  );
};

export const ModelTitle = ({ customClass, children }: TemplateTitle) => {
  return (
    <Title type={TitleTypes.ModelHeader} customClass={customClass}>
      {children}
    </Title>
  );
};
