import axios from "axios";

export default class Helpers {
  public static RestApiCall (action: string, endPoint: string): Promise<any> {
    return axios({
      url: endPoint,
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      params: {
        'output_format': 'json',
        'client_no': '', // Add the 'client_no' of the Aria enviroment here
        'auth_key': '', // Add the 'auth_key' of the Aria enviroment here
        'rest_call': action
      }
    });
  }
}