export const useDynamoDBQuery = () => {
    const execQuery2 = async (queryFunction: (...params: any) => Promise<any>, ...queryParams: any) => {
      try {
        return queryFunction(...queryParams)
      } catch (error) {
        console.log(error)
        return null
      }
    }
    return { execQuery2 }
  }