const tableOfContentsFilter = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TOC':
            return  action.nestedHeadings;
        default:
            return state
    }
}

export default tableOfContentsFilter