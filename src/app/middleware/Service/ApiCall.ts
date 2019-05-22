import axios from "axios";

import auth from "../../utils/auth";

export class ApiCall {
  private static _apiCall = (endPoint: string, method: string, params: any): Promise<any> => {
    const paramsObj = JSON.stringify(params);
    return axios({
      url: "https://x91gt4gwwl.execute-api.us-east-2.amazonaws.com/Prod/aria-api",
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      params: {
        endpoint: endPoint,
        params: encodeURI(paramsObj)
      }
    });
  }

  private static _apiWorkflowCall = (endPoint: string, method: string, params: any): Promise<any> => {
    // const paramsObj = JSON.stringify(params);
    const paramsObj = JSON.stringify(params);
    return axios({
      url: "https://x91gt4gwwl.execute-api.us-east-2.amazonaws.com/Prod/aria-api",
      method: "get",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      params: {
        endpoint: endPoint,
        params: encodeURI(paramsObj),
        method: "POST"
      }
    });

    // return axios.post(
    //   "https://ariademo.decisions.com/aria/ntegra_demo1/PostDataToFlow",
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*"
    //     },
    //     body: params
    //   }
    // );
  }

  public static Get = (action: string, endPoint: string, additionalParams?: any): Promise<any> => {
    let params: any = {
      'output_format': 'json',
      'client_no': auth.getUserInfo(),
      'auth_key': auth.getToken()
    };
    params.rest_call = action;
    if (additionalParams) {
      params = {...params, ...additionalParams};
    }
    return ApiCall._apiCall(endPoint, "get", params);
  }

  public static WorkflowGet = (endPoint: string, additionalParams?: any): Promise<any> => {
    let params: any = {
      "msgAuthDetails": {
        "clientNo": auth.getUserInfo(),
        "authKey": auth.getToken(),
        "ariaAccountID": "",
		    "ariaAccountNo": 0
      }
    };
    // params.rest_call = action;
    if (additionalParams) {
      params = {...params, ...additionalParams};
    }
    return ApiCall._apiWorkflowCall(endPoint, "get", params);
  }
}