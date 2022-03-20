export default {
    name: 'trip',
    title: 'Trip',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
        },
        {
            name: 'summary',
            title: 'Summary',
            type: 'string',
        },
        {
            name: 'thumbnail',
            title: 'thumbnail',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'hero',
            title: 'hero',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'tripDate',
            title: 'Trip Date',
            type: 'date'
        },
        {
            name: 'destinations',
            title: 'Destinations',
            type: 'array',
            of: [{type: 'reference', to: {type: 'destination'}}],
        },
        {
            name: 'itinerary',
            title: 'Itinerary',
            type: 'reference',
            to: {type: 'itinerary'},
        },
    ],
    orderings: [
        {
            title: 'Trip Date',
            name: 'tripDateAsc',
            by: [
                {field: 'tripDate', direction: 'asc'}
            ]
        }
    ],
    preview: {
        select: {
            title: 'name',
            media: 'thumbnail',
        },
    },
}
