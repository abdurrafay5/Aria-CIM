import { EndPoints } from "./EndPoints";
import { ApiCall } from "./ApiCall";

export class Service {
  public static Authenticate = (clientNumber: number, authKey: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("authenticate_caller", EndPoints.Core, {
        'client_no': clientNumber,
        'auth_key': authKey
      }).then(response => {
        resolve(response.data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccounts = (queryText?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_account_details_m", EndPoints.ObjectQuery, {
        query_string: queryText ? queryText : "*"
      }).then(response => {
        resolve(response.data.body.account_details_m);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccount = (accountNumber: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_details_all_m", EndPoints.Core, {
        acct_no: accountNumber
      }).then(response => {
        resolve(response.data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccountPaymentMethods = (accountNumber: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_payment_methods_m", EndPoints.Core, {
        acct_no: accountNumber
      }).then(response => {
        resolve(response.data.body.account_payment_methods);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetPaymentHistory = (accountNumber: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_payment_history_m", EndPoints.Core, {
        acct_no: accountNumber
      }).then(response => {
        resolve(response.data.body.acct_payment_history);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetInvoiceHistory = (accountNumber: number, masterPlanInstanceId: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_invoice_history_m", EndPoints.Core, {
        acct_no: accountNumber,
        master_plan_instance_id: masterPlanInstanceId
      }).then(response => {
        resolve(response.data.body.invoice_hist);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetUsageHistory = (accountNumber: number, masterPlanInstanceId: number, dateRangeStart: string, dateRangeEnd: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_usage_history_m", EndPoints.Core, {
        acct_no: accountNumber,
        master_plan_instance_no: masterPlanInstanceId,
        date_range_start: dateRangeStart,
        date_range_end: dateRangeEnd
      }).then(response => {
        resolve(response.data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccountPlans = (accountNumber: number): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_plans_m", EndPoints.Core, {
        acct_no: accountNumber
      }).then(response => {
        resolve(response.data.body.acct_plans_m);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccountComments = (accountNumber: number, dateRangeStart: string, dateRangeEnd: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_comments_m", EndPoints.Core, {
        acct_no: accountNumber,
        date_range_start: dateRangeStart,
        date_range_end: dateRangeEnd
      }).then(response => {
        resolve(response.data.body.acct_comments);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static UpdateAccount = (accountNumber: number, values: object): Promise<any> => {
    const params = { acct_no: accountNumber, ...values };
    return new Promise((resolve, reject) => {
      ApiCall.Get("update_acct_complete_m", EndPoints.Core, params).then(response => {
        resolve(response.data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAllMasterPlans = (accountNumber: number): Promise<any> => {
    const params = { acct_no: accountNumber };
    return new Promise((resolve, reject) => {
      ApiCall.Get("get_acct_plans_m", EndPoints.Core, params).then(response => {
        resolve(response.data.body);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccountAddresses = (accountNumber: number): Promise<any> => {
    const params = {
      distRetrieveAddrAccountInfo: {
        "ariaAccountNo": accountNumber,
		    "ariaAccountID": ""
      }
    };
    return new Promise((resolve, reject) => {
      ApiCall.WorkflowGet("https://ariademo.decisions.com/aria/demo_AMPS1/PostDataToFlow/ARIAPublishingSuite/DistributionManagement/DistRetrieveAddr", params).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetAccountDeliveryAddresses = (accountNumber: number, masterPlans: any[]): Promise<any> => {
    const params = {
      "distRetrieveAddrChgInfo": {
        "ariaAccountNo": accountNumber,
        "distRetrieveAddrChgTitleCodeList": masterPlans,
        "distRetrieveStartDate": "2010-01-01",
        "distRetrieveEndDate": "2040-12-31"
      }
    };
    return new Promise((resolve, reject) => {
      ApiCall.WorkflowGet("https://ariademo.decisions.com/aria/demo_AMPS1/PostDataToFlow/ARIAPublishingSuite/DistributionManagement/DistRetrieveAddrChg", params).then(response => {
        resolve(response.data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  public static GetFullDeliveryAddressInformation = (accountNumber: number, plans: any[], masterPlans: any[]): Promise<any> => {
    return new Promise((resolve, reject) => {
      Promise.all([
        Service.GetAccountAddresses(accountNumber),
        Service.GetAccountDeliveryAddresses(accountNumber, masterPlans)
      ]).then(results => {
        const addresses = results[0].body.distRetrieveAddrList;
        const addressesLength: number = addresses.length;

        const deliverySchedule = results[1].body.distRetrieveAddrChgTitleList;
        const deliveryScheduleLength: number = deliverySchedule.length;

        const plansLength: number = plans.length;

        const newSchedule: any[] = [];
        
        for (let i = 0; i < deliveryScheduleLength; i++) {
          const delivery = deliverySchedule[i].distRetrieveAddrChgTitleDetails
          const deliveryLength = delivery.length;

          for (let x = 0; x < deliveryLength; x++) {
            const changes = delivery[x].distRetrieveAddrChgDetails;
            const changesLength = changes.length;

            for (let y = 0; y < changesLength; y++) {
              const details = changes[y];
              const addressId = details.distAddrNo;
              const planId = details.master_plan_instance_no;

              let addressDetails = {};
              let planDetails = {};

              for (let p = 0; p < addressesLength; p++) {
                const currentAddress = addresses[p];
                if (currentAddress.distRetrieveAddrInfo.distAddrNo === addressId) {
                  addressDetails = currentAddress.distRetrieveAddrInfo;
                  break;
                }
              }

              for (let b = 0; b < plansLength; b++) {
                const currentPlan = plans[b];
                if (currentPlan.plan_instance_no === planId) {
                  planDetails = currentPlan;
                  break;
                }
              }

              newSchedule.push({
                schedule: details,
                address: addressDetails,
                plan: planDetails
              });
            }
          }
        }

        resolve(newSchedule);
      });
    });
  }

  public static GetAccountStatusFromCode = code => {
    const codes = {
      "0": "Inactive",
      "1": "Active",
      "2": "Cancellation Pending",
      "3": "Termination Pending",
      "10": "Active Dunning Pending",
      "11":	"Active Dunning 1",
      "12":	"Active Dunning 1",
      "13":	"Active Dunning 3",
      "14":	"Active Dunning 4",
      "15":	"Active Dunning 5",
      "16":	"Active Dunning 6",
      "17":	"Active Dunning 7",
      "18":	"Active Dunning 8",
      "21":	"Reinstated Forward Bill",
      "22":	"Reinstated Back Bill",
      "31":	"Installation Pending",
      "32":	"Registered Pending Activation",
      "41":	"Active Trial",
      "51":	"Temporary Service Ban",
      "61":	"Active Non-billable",
      "99":	"Permanent",
      "-1":	"Suspended",
      "-2":	"Cancelled",
      "-3":	"Terminated",
      "-4":	"Contract Expired",
      "-11": "Suspended Dunning 1",
      "-12": "Suspended Dunning 2",
      "-13": "Suspended Dunning 3",
      "-14": "Suspended Dunning 4",
      "-15": "Suspended Dunning 5",
      "-99": "Archived"
    };
    return codes[code] ? codes[code] : "";
  }

  public static GetAccountPaymentMethodFromCode = code => {
    const codes = {
      "-1":	"External Payment",
      "0":	"Other",
      "1":	"Credit card",
      "2":	"Electronic Check (ACH)",
      "3":	"Pre-paid",
      "4":	"Net terms 30",
      "5":	"Net terms 10",
      "6":	"Net terms 15",
      "7":	"Net terms 60",
      "8":	"Click&Buy",
      "9":	"Net Terms 0",
      "10":	"PayByCash",
      "11":	"PayPal Express Checkout",
      "12":	"Net Terms 45",
      "13":	"Tokenized Credit Card",
      "14":	"Purchase Power",
      "15":	"Net Terms 35",
      "16":	"Net Terms 75",
      "17":	"Net Terms 90",
      "18":	"Net Terms 120",
      "19":	"Net Terms 25",
      "26":	"Direct Debit"
    };
    return codes[code] ? codes[code] : "";
  }

  public static GetCardTypeFromCode = code => {
    const codes = {
      "1": "Visa",
      "2": "MasterCard",
      "3": "American Express",
      "4": "Discover",
      "5": "Diners Club/Carte Blanche",
      "6": "Maestro",
      "7": "JCB",
      "8": "Laser",
      "9": "Dankoort"
    };
    return codes[code] ? codes[code] : "";
  }
}