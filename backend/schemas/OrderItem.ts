import { integer, relationship, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const OrderItem = list({
  // TODO
  // access
  fields: {
    name: text({ isRequired: true }),
    description: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
    price: integer(),
    photo: relationship({
      ref: 'ProductImage',
      ui: {
        displayMode: 'cards',
        cardFields: ['image', 'altText'],
        inlineCreate: { fields: ['image', 'altText'] },
        inlineEdit: { fields: ['image', 'altText'] },
      },
    }),
    quantity: integer(),
    order: relationship({ ref: 'Order.items' }),
  },
});
