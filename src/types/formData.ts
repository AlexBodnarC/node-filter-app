export interface IFilter {
  id: string
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than"
  value: string | number
}

export interface IQuestion {
  id: string
  name: string
  type: string
  value: string | number
}

export interface IResponse {
  questions: IQuestion[]
}
