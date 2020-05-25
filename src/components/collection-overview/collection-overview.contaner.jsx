import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';
import { selectIsCollectionsFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collection-overview.component';
import {compose} from 'redux';
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching
})

const CollectionOverviewContainer = compose(connect(mapStateToProps),
WithSpinner
)(CollectionsOverview)

export default CollectionOverviewContainer;