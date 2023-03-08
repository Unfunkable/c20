import {instantiateType, buildTypeDefs, walkTypeDefs} from "../../structs";
import {slugify} from "../../utils/strings";
import localizations from "./localizations";
import Hex, {format as formatHex} from "../Hex/Hex";
import {RenderContext, useCtx} from "../Ctx/Ctx";
import {type LocalizeFn} from "../../utils/localization";
import {type VNode} from "preact";
import {Jump} from "../Heading/Heading";
import Md from "../Md/Md";
import DetailsList from "../DetailsList/DetailsList";
import {renderPlaintextFromSrc} from "../Md/plaintext";
import Wat from "../Wat/Wat";
import {type FoundHeading} from "../Md/headings";
import {useLocalize} from "../Locale/Locale";

type LocalizerKey = keyof typeof localizations;
type Localizer = LocalizeFn<LocalizerKey>;

function processMeta(meta: Record<string, any> | undefined | null): Record<string, any> {
  meta = {...meta};
  if (meta.pre_compile || meta.post_compile) {
    meta.compile_processed = true;
  }
  return meta;
}

function renderComments(ctx: RenderContext, part, localize: Localizer) {
  const meta = Object.entries(processMeta(part.meta))
    .filter(([k]) => localize(`meta_${k}` as LocalizerKey, true));
  return <>
    {meta.length > 0 &&
      <ul className="field-metas">
        {meta.map(([k, v]) =>
          <li className="field-meta">{localize(`meta_${k}` as LocalizerKey)}{v !== true ? `: ${v}` : ""}</li>
        )}
      </ul>
    }
    {part.comments && part.comments[ctx.lang] &&
      <Md src={part.comments[ctx.lang]}/>
    }
  </>;
}

function renderStructFieldType(ctx: RenderContext, props: StructTableProps, field, fieldOffset, instantiatedType, localize: Localizer) {
  const {typeDef, totalSize, singleSize, variableSize, count, type_args, typeName} = instantiatedType;
  let typeStr: string = typeName;
  if (typeDef.class == "bitfield" || typeDef.class == "enum") {
    if (props.simpleTypes) {
      typeStr = typeDef.class;
    } else {
      typeStr += `: ${typeDef.class}${singleSize * 8}`;
    }
  }
  if (!props.simpleTypes && type_args) {
    typeStr += `<${Object.values(type_args).join(", ")}>`;
  }
  if (variableSize !== undefined) {
    typeStr += `(${variableSize})`;
  }
  if (count !== undefined) {
    typeStr += `[${count}]`;
  }
  let endiannessLabel;
  if (typeDef.endianness !== undefined) {
    const endianness = typeDef.endianness == "little" ? "LE" : (typeDef.endianness == "big" ? "BE" : "LE/BE");
    endiannessLabel = <span className="field-label">{endianness}</span>;
  }
  const typeCode = (
    <code title={`${totalSize} bytes @ ${formatHex(fieldOffset)}`}>
      {typeStr}
      {endiannessLabel && " "}
      {endiannessLabel}
    </code>
  );
  if (field.meta && field.meta.tag_classes) {
    return (
      <DetailsList summary={typeCode} maxOpen={4} items={field.meta.tag_classes.map(tagName => {
        if (tagName == "*") return "(any)";
        const tagPage = ctx.resolvePage(tagName);
        return <a href={tagPage.url}>{tagName}</a>;
      })}/>
    );
  }
  if (field.meta && field.meta.index_of) {
    const targetHeadingId = slugify(`${props.id ?? props.entryType}-${field.meta.index_of}`);
    return <>{typeCode}<a title={localize("seeIndex")} href={`#${targetHeadingId}`}>→</a></>;
  }
  return typeCode;
}

function renderFieldName(fieldName: string | undefined, pathId: string[]): VNode | null {
  if (!fieldName) return null;
  fieldName = fieldName.replace(/_/g, " ");
  const pathTitle = pathId.slice(1).join("/");
  const pathIdAttr = slugify(pathId.join("-"))!;
  return (
    <span title={pathTitle} id={pathIdAttr}>
      <Jump id={pathIdAttr}>{fieldName}</Jump>
    </span>
  );
}

function renderStructAsTable(seenTypes, typeDefs, props: StructTableProps, ctx: RenderContext, instantiatedType, pathId: string[], localize: Localizer) {
  const widths = 50 / (props.showOffsets ? 3 : 2);
  let offset = 0;

  if (instantiatedType.typeDef.fields.length == 0) {
    return (
      <p><em>{localize("emptyStruct")}</em></p>
    );
  }

  return (
    <table className="type-def struct">
      <thead>
        <tr>
          <th style={`width:${widths}%`}>{localize("field")}</th>
          {props.showOffsets &&
            <th style={`width:${widths}%`}>{localize("offset")}</th>
          }
          <th style={`width:${widths}%`}>{localize("type")}</th>
          <th>{localize("comments")}</th>
        </tr>
      </thead>
      <tbody>
        {instantiatedType.typeDef.fields.map(field => {
          if (props.skipPadding && field.type == "pad") {
            return null;
          }

          const fieldPathId = [...pathId, field.name];
          const fieldOffset = offset;
          const instantiatedFieldType = instantiateType(typeDefs, field, instantiatedType.type_args, {});
          const {typeDef: fieldTypeDef, totalSize: fieldSize, typeName: fieldTypeName, type_args: fieldTypeArgs} = instantiatedFieldType;
          offset += fieldSize;

          const seenTypeId = `${fieldTypeName}<${fieldTypeArgs && Object.values(fieldTypeArgs).join(",")}>`;
          const hasSeenType = seenTypes[seenTypeId];
          if (!hasSeenType) {
            seenTypes[seenTypeId] = fieldPathId;
          }

          let embeddedType: any = undefined;
          if (!props.noEmbed?.includes(fieldTypeName) && !(field.meta && field.meta.unused)) {
            if (fieldTypeArgs && (fieldTypeName == "Block" || fieldTypeName == "ptr32" || fieldTypeName == "ptr64")) {
              embeddedType = instantiateType(typeDefs, {type: Object.values(fieldTypeArgs)[0]}, instantiatedType.type_args, {});
              if (embeddedType.typeDef.class) {
                // headings.push({title: field.name.replace(/_/g, " "), id: slugify(fieldPathId.join("-")), level: fieldPathId.length});
              } else {
                embeddedType = undefined;
              }
            } else if (fieldTypeDef.class) {
              embeddedType = instantiatedFieldType;
            }
          }

          const rowClasses = [
            "struct-field",
            `field-type-${field.type}`,
            ...(field.meta ? Object.entries(field.meta).map(([k]) => `field-meta-${k}`) : []),
            ...(fieldTypeDef.class ? [`has-embedded-class-${fieldTypeDef.class}`] : [])
          ];

          return (
            <>
              <tr className={rowClasses.join(" ")}>
                <td className="field-name">{renderFieldName(field.name, fieldPathId)}</td>
                {props.showOffsets &&
                  <td className="field-offset"><Hex value={fieldOffset}/></td>
                }
                <td className="field-type">
                  {renderStructFieldType(ctx, props, field, fieldOffset, instantiatedFieldType, localize)}
                  {embeddedType && hasSeenType &&
                    <Wat href={`#${slugify(hasSeenType.join("-"))}`}/>
                  }
                </td>
                <td className="comments">{renderComments(ctx, field, localize)}</td>
              </tr>
              {embeddedType && !hasSeenType &&
                <tr className="embedded-type">
                  <td colSpan={props.showOffsets ? 4 : 3}>
                    {renderTypeAsTable(seenTypes, typeDefs, ctx, props, embeddedType, fieldPathId, localize)}
                  </td>
                </tr>
              }
            </>
          );
        })}
      </tbody>
    </table>
  );
}

function renderBitfieldAsTable(ctx: RenderContext, instantiatedType, pathId: string[], localize: Localizer) {
  return (
    <table className="type-def bitfield">
      <thead>
        <tr>
          <th style="width:25%">{localize("flag")}</th>
          <th style="width:25%">{localize("mask")}</th>
          <th>{localize("comments")}</th>
        </tr>
      </thead>
      <tbody>
        {instantiatedType.typeDef.bits.map((bit, i) =>
          <tr>
            <td>{renderFieldName(bit.name, [...pathId, bit.name])}</td>
            <td><Hex value={0x1 << i >>> 0}/></td>
            <td>{renderComments(ctx, bit, localize)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderEnumAsTable(ctx: RenderContext, instantiatedType, pathId: string[], localize: Localizer) {
  return (
    <table className="type-def enum">
      <thead>
        <tr>
          <th style="width:25%">{localize("option")}</th>
          <th style="width:25%">{localize("value")}</th>
          <th>{localize("comments")}</th>
        </tr>
      </thead>
      <tbody>
        {instantiatedType.typeDef.options.map((option, i) =>
          <tr>
            <td>{renderFieldName(option.name, [...pathId, option.name])}</td>
            <td><Hex value={option.value !== undefined ? option.value : i}/></td>
            <td>{renderComments(ctx, option, localize)}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function renderTypeAsTable(seenTypes, typeDefs, ctx: RenderContext, props: StructTableProps, instantiatedType, pathId: string[], localize: Localizer) {
  // addSearchTermsForTypeDef(instantiatedType.typeDef);
  return <>
    {!props.noRootComments || pathId.length > 1 &&
      renderComments(ctx, instantiatedType.typeDef, localize)
    }
    {(() => {
      switch (instantiatedType.typeDef.class) {
        case "struct":
          return renderStructAsTable(seenTypes, typeDefs, props, ctx, instantiatedType, pathId, localize);
        case "bitfield":
          return renderBitfieldAsTable(ctx, instantiatedType, pathId, localize);
        case "enum":
          return renderEnumAsTable(ctx, instantiatedType, pathId, localize);
        default:
          console.error(instantiatedType.typeDef);
          throw new Error(`Unhandled type class: ${instantiatedType.typeDef.class}`);
      }
    })()}
  </>;
}

export type StructTableProps = {
  entryModule: string;
  entryType: string;
  noEmbed?: string[];

  showOffsets?: boolean;
  noRootExtend?: boolean;
  noRootComments?: boolean;
  skipPadding?: boolean;
  simpleTypes?: boolean;
  id?: string;
};

//note that this doesnt render fields in a depth-first order, it just needs to work for search
export function renderPlaintext(ctx: RenderContext | undefined, props: StructTableProps): string {
  if (!ctx) return "";
  const lines: string[] = [];
  const modules = ctx.data.structs;
  walkTypeDefs(props.entryType, props.entryModule, modules, props, (typeDef) => {
    if (typeDef.comments) {
      lines.push(renderPlaintextFromSrc(ctx, typeDef.comments[ctx.lang]) ?? "")
    }
    if (typeDef.class == "struct") {
      typeDef.fields.forEach(f => {
        if (f.name) {
          lines.push(`${f.name.split("_").join(" ")} ${renderPlaintextFromSrc(ctx, f.comments?.[ctx.lang]) ?? ""}`);
        }
      });
    } else if (typeDef.class == "enum") {
      typeDef.options.forEach(o => {
        lines.push(`${o.name.split("_").join(" ")} ${renderPlaintextFromSrc(ctx, o.comments?.[ctx.lang]) ?? ""}`);
      });
    } else if (typeDef.class == "bitfield") {
      typeDef.bits.forEach(b => {
        lines.push(`${b.name.split("_").join(" ")} ${renderPlaintextFromSrc(ctx, b.comments?.[ctx.lang]) ?? ""}`);
      });
    }
  });
  return lines.join("\n");
};

export function headings(ctx: RenderContext | undefined, props: StructTableProps): FoundHeading[] {
  if (!ctx) return [];
  const initialImports = {[props.entryModule]: [props.entryType]};
  const modules = ctx.data.structs;
  const typeDefs = buildTypeDefs(initialImports, modules);
  const instantiatedType = instantiateType(typeDefs, {type: props.entryType}, null, {noRootExtend: props.noRootExtend});
  let headings: FoundHeading[] = [];
  
  if (instantiatedType.typeDef.class == "struct") {
    instantiatedType.typeDef.fields.forEach(field => {
      const fieldPathId = [props.id ?? props.entryType, field.name];
      const instantiatedFieldType = instantiateType(typeDefs, field, instantiatedType.type_args, {});
      const {typeDef: fieldTypeDef, typeName: fieldTypeName, type_args: fieldTypeArgs} = instantiatedFieldType;

      let embeddedType: any = undefined;
      if (!props.noEmbed?.includes(fieldTypeName) && !(field.meta && field.meta.unused)) {
        if (fieldTypeArgs && (fieldTypeName == "Block" || fieldTypeName == "ptr32" || fieldTypeName == "ptr64")) {
          embeddedType = instantiateType(typeDefs, {type: Object.values(fieldTypeArgs)[0]}, instantiatedType.type_args, {});
          if (embeddedType.typeDef.class) {
            headings.push({title: field.name.replace(/_/g, " "), id: slugify(fieldPathId.join("-"))!, level: 2});
          }
        }
      }
    });
  }
  return headings;
};

export default function StructTable(props: StructTableProps) {
  const ctx = useCtx();
  if (!ctx) return null;

  const initialImports = {[props.entryModule]: [props.entryType]};
  const modules = ctx.data.structs;
  const typeDefs = buildTypeDefs(initialImports, modules);
  const instantiatedType = instantiateType(typeDefs, {type: props.entryType}, null, {noRootExtend: props.noRootExtend});

  // const searchTerms: string[] = [];
  // const headings: any = [];
  const seenTypes = {};
  const pathId = [props.id ?? props.entryType];
  const {localize} = useLocalize(localizations);
  return (
    <div className="table-wrapper">
      {renderTypeAsTable(seenTypes, typeDefs, ctx, props, instantiatedType, pathId, localize)}
    </div>
  );
};