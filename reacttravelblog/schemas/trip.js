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
      title: 'Trip Date',
      name: 'tripDate',
      type: 'date'
    },
    {
      name: 'countries',
      title: 'Countries',
      type: 'array',
      of: [{type: 'reference', to: {type: 'country'}}],
    },
  ],
  orderings: [
    {
      title:'Trip Date',
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
