// components/SEOForm.tsx
import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const SeoTable: React.FC = () => {
  const [form] = Form.useForm();
  
  // Define state for each form field
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    keywords: '',
    canonical: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogUrl: '',
    ogType: '',
    ogSiteName: ''
  });

  const onFinish = (values: any) => {
    console.log('Form values:', values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const formFields = [
    { label: 'Seo Title', name: 'title', component: <Input.TextArea name="title" value={formValues.title} onChange={handleChange} /> },
    { label: 'Meta Description', name: 'description', component: <Input.TextArea name="description" value={formValues.description} rows={2} onChange={handleChange} /> },
    { label: 'Meta Keywords', name: 'keywords', component: <Input.TextArea name="keywords" value={formValues.keywords} onChange={handleChange} /> },
    { label: 'Canonical', name: 'canonical', component: <Input.TextArea name="canonical" value={formValues.canonical} onChange={handleChange} /> },
    { label: 'Og:Title', name: 'ogTitle', component: <Input.TextArea name="ogTitle" value={formValues.ogTitle} onChange={handleChange} /> },
    { label: 'Og:Description', name: 'ogDescription', component: <Input.TextArea name="ogDescription" value={formValues.ogDescription} rows={2} onChange={handleChange} /> },
    { label: 'Og:Image', name: 'ogImage', component: <Input.TextArea name="ogImage" value={formValues.ogImage} onChange={handleChange} /> },
    { label: 'Og:Url', name: 'ogUrl', component: <Input.TextArea name="ogUrl" value={formValues.ogUrl} onChange={handleChange} /> },
    { label: 'Og:Type', name: 'ogType', component: <Input.TextArea name="ogType" value={formValues.ogType} onChange={handleChange} /> },
    { label: 'Og:Site Name', name: 'ogSiteName', component: <Input.TextArea name="ogSiteName" value={formValues.ogSiteName} onChange={handleChange} /> }
  ];

  return (
    <div className="p-10 w-6/12 mx-auto bg-gray-100 mb-10 shadow-xl">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {formFields.map((field) => (
          <div key={field.name}>
            <Form.Item label={field.label} name={field.name}>
              {field.component}
            </Form.Item>
          </div>
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
