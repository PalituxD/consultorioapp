import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
  Patient: a
    .model({
      firstName: a.string().required(),
      lastName: a.string().required(),
      dob: a.datetime(),
      email: a.email().required(),
      phone1: a.string().required(),
      phone2: a.string(),
      address: a.string(),
      createdBy: a.string(),
      treatments: a.hasMany('PatientTreatment', 'patientId'),
      // documents: a.hasMany('Document', 'patientId'),
    })
    .authorization((allow) => [allow.owner()]),
  Treatment: a
    .model({
      title: a.string().required(),
      description: a.string().required(),
      price: a.float().required(),
      numberOfSessions: a.id().required(),
      createdBy: a.string().required(),
      additionalInfo: a.json(),
      treatments: a.hasMany('PatientTreatment', 'treatmentId'),
    })
    .authorization((allow) => [allow.owner()]),
  PatientTreatment: a
    .model({
      price: a.float().required(),
      numberOfSessions: a.id().required(),
      patientId: a.id().required(),
      treatmentId: a.id().required(),
      status: a.string().required(),
      createdBy: a.string().required(),
      updatedBy: a.string(),
      additionalInfo: a.json(),
      // documents: a.hasMany('Document', 'patientTreatmentId'),
      appointments: a.hasMany('Appointment', 'patientTreatmentId'),
      // payments: a.hasMany('Payment', 'patientTreatmentId'),
      patient: a.belongsTo('Patient', 'patientId'),
      treatment: a.belongsTo('Treatment', 'treatmentId'),
    })
    .authorization((allow) => [allow.owner()]),
  // Appointment: a
  //   .model({
  //     price: a.float().required(),
  //     number: a.id().required(),
  //     scheduledDate: a.datetime(),
  //     dateOfAttendance: a.datetime(),
  //     status: a.string().required(),
  //     createdBy: a.string().required(),
  //     updatedBy: a.string(),
  //     additionalInfo: a.json(),
  //     // documents: a.hasMany('Document', 'appointmentId'),
  //     patientTreatmentId: a.id().required(),
  //     patientTreatment: a.belongsTo('PatientTreatment', 'patientTreatmentId'),
  //   })
  //   .authorization((allow) => [allow.owner()]),
  // Payment: a
  //   .model({
  //     amount: a.float().required(),
  //     paymentMethod: a.string().required(),
  //     status: a.string(),
  //     verifiedBy: a.string(),
  //     createdBy: a.string().required(),
  //     updatedBy: a.string(),
  //     additionalInfo: a.json(),
  //     documents: a.hasMany('Document', 'paymentId'),
  //     patientTreatmentId: a.id().required(),
  //     patientTreatment: a.belongsTo('PatientTreatment', 'patientTreatmentId'),
  //   })
  //   .authorization((allow) => [allow.owner()]),
  // Document: a
  //   .model({
  //     price: a.float().required(),
  //     number: a.id().required(),
  //     scheduledDate: a.datetime(),
  //     dateOfAttendance: a.datetime(),
  //     status: a.string().required(),
  //     createdBy: a.string().required(),
  //     updatedBy: a.string(),
  //     additionalInfo: a.json(),
  //     paymentId: a.id(),
  //     payment: a.belongsTo('Payment', 'paymentId'),
  //     appointmentId: a.id(),
  //     appointment: a.belongsTo('Appointment', 'appointmentId'),
  //     patientTreatmentId: a.id(),
  //     patientTreatment: a.belongsTo('PatientTreatment', 'patientTreatmentId'),
  //     patientId: a.id(),
  //     patient: a.belongsTo('Patient', 'patientId'),
  //   })
  //   .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
    // defaultAuthorizationMode: "apiKey",
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
