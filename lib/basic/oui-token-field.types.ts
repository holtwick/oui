export interface TextContent {
  type: 'text'
  text: string
}

export interface TokenContent {
  type: 'token'
  name: string
  option?: string
}

export type ContentItem = TextContent | TokenContent

export interface TokenFieldContent {
  content: ContentItem[]
}

export interface TokenFieldProps {
  modelValue?: TokenFieldContent
  availableTokens?: string[]
  tokenOptions?: Record<string, string[]>
}

export interface TokenFieldEmits {
  (e: 'update:modelValue', value: TokenFieldContent): void
}
