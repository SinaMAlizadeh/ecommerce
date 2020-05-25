import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector}  from 'reselect';

import {selectIsCollectionsLoaded} from "../../redux/shop/shop.selectors";
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToPrpops= createStructuredSelector({
    isLoading : (state) => !selectIsCollectionsLoaded(state)
})

const CollectionPageCotainer = compose(
    connect(mapStateToPrpops),
    WithSpinner
)(CollectionPage);

export default CollectionPageCotainer;