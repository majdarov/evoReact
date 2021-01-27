import { NavLink } from "react-router-dom";
import { getTitle } from "../../redux/Actions";
import { connect } from "react-redux";

const mapState = (state, ownProps) => {
  let { to, exact, activeClassName } = ownProps;
  return { activeClassName, to, exact };
};

const mapDispatch = (dispatch, ownProps) => {
  let { to } = ownProps;
  return {
    onClick: () => {
      getTitle(to);
    },
  };
};

const NavLinkContainer = connect(mapState, mapDispatch)(NavLink);

export default NavLinkContainer;
