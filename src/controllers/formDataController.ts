import { Request, Response } from "express"
import config from "../config"
import { IFilter, IResponse } from "../types"

export const getFormData = async (req: Request, res: Response) => {
  try {
    const { API_KEY } = config

    const { formId } = req.params
    const { filters } = req.query

    const filloutResponse = await fetch(
      `https://api.fillout.com/v1/api/forms/${formId}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    )

    const filloutData = await filloutResponse.json()

    if (!filters) {
      return res.status(200).json({ ...filloutData })
    }

    const parsedFilters = JSON.parse(filters as string)

    const filteredResponses = filloutData.responses.filter(
      (response: IResponse) => {
        return parsedFilters.every((filter: IFilter) => {
          const question = response.questions.find(
            (question) => question.id === filter.id
          )

          if (!question) return false

          switch (filter.condition) {
            case "equals":
              return question.value === filter.value
            case "does_not_equal":
              return question.value !== filter.value
            case "greater_than":
              return new Date(question.value) > new Date(filter.value)
            case "less_than":
              return new Date(question.value) < new Date(filter.value)
            default:
              return false
          }
        })
      }
    )

    res.status(200).json({
      responses: filteredResponses,
      totalResponses: filteredResponses.length,
      pageCount: 1
    })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
