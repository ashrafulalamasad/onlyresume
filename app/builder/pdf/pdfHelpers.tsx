import { View, Text, Link } from "@react-pdf/renderer";
import type { Style } from "@react-pdf/stylesheet";
import type { ContactItem } from "../templates/contacts";

/**
 * Small presentational helpers shared by the 17 new PDF templates. The 3
 * original PDF templates (PDFMinimal/Corporate/Modern) predate this file and
 * stay self-contained — these helpers are only used by the new ones. Both web
 * and PDF templates pull contact/date/location logic from
 * `../templates/contacts`, so this file only adds the JSX-shaped pieces.
 */

/** Collapse single newlines to spaces; keep paragraph breaks (double newline). */
export function normalizeText(text: string): string {
  return text.replace(/\r/g, "").replace(/([^\n])\n([^\n])/g, "$1 $2");
}

type TextStyle = Style;

/** One contact item — clickable link when it has an href, plain text otherwise. */
export function PdfContactText({
  item,
  style,
}: {
  item: ContactItem;
  style: TextStyle;
}) {
  if (item.href) {
    return (
      <Link href={item.href} style={{ textDecoration: "none" }}>
        <Text style={style}>{item.value}</Text>
      </Link>
    );
  }
  return <Text style={style}>{item.value}</Text>;
}

/** Centered horizontal contact row, items separated by " | ". */
export function PdfContactRow({
  items,
  color,
  sepColor = "#CBD5E1",
  fontSize = 9,
}: {
  items: ContactItem[];
  color: string;
  sepColor?: string;
  fontSize?: number;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
      }}
    >
      {items.map((c, i) => (
        <View key={c.key} style={{ flexDirection: "row", alignItems: "center" }}>
          {i > 0 && (
            <Text style={{ fontSize, color: sepColor, marginHorizontal: 2 }}>
              |
            </Text>
          )}
          <PdfContactText item={c} style={{ fontSize, color }} />
        </View>
      ))}
    </View>
  );
}

/** Vertical contact list for sidebars. */
export function PdfContactColumn({
  items,
  linkColor,
  plainColor = "#CCFBF1",
  fontSize = 9,
}: {
  items: ContactItem[];
  linkColor: string;
  plainColor?: string;
  fontSize?: number;
}) {
  return (
    <View style={{ marginTop: 2 }}>
      {items.map((c) => (
        <View key={c.key} style={{ marginBottom: 1 }}>
          <PdfContactText
            item={c}
            style={{ fontSize, color: c.href ? linkColor : plainColor }}
          />
        </View>
      ))}
    </View>
  );
}
