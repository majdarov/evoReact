import Commodity from "./Commodity";
import {
  setPid, getGroups, getProducts,
  setViewForm, getProductId, deleteProduct, setFormData,
  toggleFormPost, postFormData, setFormError, setError, setCommodities
} from "../../redux/Actions";
import { connect } from "react-redux";

const mapState = state => {
  const isInit = state.app.isInit;
  state = state.commodityPage;
  return {
    isLoaded: state.isLoaded,
    groups: state.groups,
    price: "Price",
    pid: state.pid,
    commodities: state.commodities,
    comIsLoaded: state.comIsLoaded,
    error: state.error,
    viewForm: state.viewForm,
    formData: state.form.formData,
    formPost: state.form.formPost,
    formError: state.form.formError,
    isInit
  };
};

export default connect(mapState, {
  getGroups,
  getProducts,
  setPid,
  setViewForm,
  getProductId,
  deleteProduct,
  setFormData,
  toggleFormPost,
  postFormData,
  setFormError,
  setError,
  setCommodities
})(Commodity);
