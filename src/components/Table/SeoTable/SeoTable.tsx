// components/SEOForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';

const SeoTable: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  const formFields = [
    { label: 'Title', name: 'title', component: <Input /> },
    { label: 'Description', name: 'description', component: <Input.TextArea rows={4} /> },
    { label: 'Keywords', name: 'keywords', component: <Input /> },
    { label: 'Canonical', name: 'canonical', component: <Input /> },
    { label: 'Og:Title', name: 'ogTitle', component: <Input /> },
    { label: 'Og:Description', name: 'ogDescription', component: <Input.TextArea rows={4} /> },
    { label: 'Og:Image', name: 'ogImage', component: <Input /> },
    { label: 'Og:Url', name: 'ogUrl', component: <Input /> },
  ];

  return (
    <div className="p-4 w-full">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {formFields.map((field) => (
          <Form.Item label={field.label} name={field.name} key={field.name}>
            {field.component}
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-yellow-500">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SeoTable;
