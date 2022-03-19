export default {
  name: 'destination',
  title: 'Destination',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Destination Name',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Destination Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bgImage',
      title: 'Destination Background',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'isCountry',
      title: 'Is Country?',
      type: 'boolean',
    },
    {
      name: 'isRegion',
      title: 'Is Region?',
      type: 'boolean',
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
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'name',
      media: 'icon',
    },
  },
}
