import {connect} from 'react-redux'
import TableOfContentsDrawer from "../components/post/toc/TableOfContentsDrawer";

const mapStateToProps = state => {
    return {nestedHeadings: state.tableOfContentsFilter};
};

export default connect(
    mapStateToProps,
)(TableOfContentsDrawer)
