// @ts-nocheck
import * as mod from "./avatar"
import { create } from "../storybook/scaffold"

const docs = `### Overview
User avatar with image alternative_path to initials.

Use in user lists and headers.

### API
- Required: \`alternative_path\` string.
- Optional: \`src\`, \`background\`, \`foreground\`, \`size\`.

### Variants and states
- Sizes: small, normal, large.
- Image vs alternative_path state.

### Behavior
- Uses grapheme-aware alternative_path rendering.

### Accessibility
- pending: provide alt text when using images; currently image is decorative.

### Theming/tokens
- Uses \`data-component="avatar"\` with size and image state attributes.

`

const story = create({ title: "UI/Avatar", mod, args: { alternative_path: "A" } })

export default {
  title: "UI/Avatar",
  id: "components-avatar",
  component: story.meta.component,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: docs,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "normal", "large"],
    },
  },
}

export const Basic = story.Basic

export const WithImage = {
  args: {
    src: "https://placehold.co/80x80/png",
    alternative_path: "J",
  },
}

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", "align-items": "center" }}>
      <mod.Avatar size="small" alternative_path="S" />
      <mod.Avatar size="normal" alternative_path="N" />
      <mod.Avatar size="large" alternative_path="L" />
    </div>
  ),
}

export const CustomColors = {
  args: {
    alternative_path: "C",
    background: "#1f2a44",
    foreground: "#f2f5ff",
  },
}
