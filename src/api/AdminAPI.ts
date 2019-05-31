import IAxios from "@utils/axios/IAxios";
import IAdminModel from "../model/IAdminModel";

export default class AdminAPI {
  public static getAdmin = () => new IAxios<IAdminModel>({url: '/api/Admin.json'}).ajax()
}
