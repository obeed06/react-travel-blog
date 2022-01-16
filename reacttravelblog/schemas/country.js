export default {
  name: 'country',
  title: 'Country',
  type: 'document',
  fields: [
    {
      name: 'country',
      title: 'Country',
      type: 'string',
    },
    {
      name: 'countryImage',
      title: 'Country image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'country',
      media: 'countryImage',
    },
  },
}
