'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const InviteFriends = () => (
  <div>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="friends">
            {({ insert, remove, push }) => (
              <div>
                {values.friends.length > 0 &&
                  values.friends.map((friend, index) => (
                    <div className="row" key={index}>
                      <div className="col mb-4">
                        <Field
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          name={`friends.${index}.name`}
                          placeholder="Jane Doe"
                          type="text"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col mb-4">
                        <Field
                          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                          name={`friends.${index}.email`}
                          placeholder="jane@acme.com"
                          type="email"
                        />
                        <ErrorMessage
                          name={`friends.${index}.name`}
                          component="div"
                          className="field-error"
                        />
                      </div>
                      <div className="col mb-4">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}

                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Products
                </button>
              </div>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  </div>
);

export default InviteFriends;
