import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaArrowLeft } from 'react-icons/fa';
import { SiTypescript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiGithub, SiFlutter, SiFirebase } from 'react-icons/si';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import './KnowledgeBaseArticle.css';

// Define types for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Define the article type
interface Article {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  author: string;
  role: string;
  bio: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Article content data
const articleContent: Record<string, Article> = {
  'payment-gateway-integration': {
    id: 7,
    title: 'Payment Gateway Integration: A Comprehensive Guide',
    category: 'Payment Processing',
    description: 'Learn how to securely integrate payment gateways into your applications with best practices and code examples.',
    content: `## Introduction to Payment Gateway Integration

Payment gateway integration is a critical component of any e-commerce or subscription-based application. This guide will walk you through the process of integrating payment gateways, security considerations, and best practices.

## Popular Payment Gateways

- **MPesa**: Leading mobile money service in Africa
- **Stripe**: Developer-friendly with extensive documentation
- **PayPal**: Widely recognized and trusted
- **Square**: Great for in-person and online payments
- **Braintree**: Owned by PayPal, supports various payment methods
- **Authorize.Net**: Enterprise-grade solution

## Key Concepts

### 1. Payment Flow
1. Customer initiates payment
2. Payment details are collected
3. Data is sent to payment processor
4. Processor validates and processes payment
5. Response is returned to your application

### 2. Security Standards
- **PCI DSS Compliance**: Required for handling card data
- **Tokenization**: Replace sensitive data with tokens
- **3D Secure**: Additional authentication layer
- **Encryption**: Encrypt data in transit and at rest

## Implementation Guide

### 1. MPesa Integration

MPesa is a mobile phone-based money transfer service that's widely used in Africa. Here's how to integrate it:

#### Setting Up MPesa

\`\`\`javascript
// Install required packages
// npm install axios

const axios = require('axios');
const crypto = require('crypto');
const moment = require('moment');

// MPesa API credentials
const consumerKey = 'YOUR_CONSUMER_KEY';
const consumerSecret = 'YOUR_CONSUMER_SECRET';
const passKey = 'YOUR_PASS_KEY';
const shortCode = 'YOUR_SHORTCODE';
const initiatorName = 'YOUR_INITIATOR_NAME';
const securityCredential = 'YOUR_SECURITY_CREDENTIAL';

// Generate access token
async function getAccessToken() {
  try {
    const auth = Buffer.from(consumerKey + ':' + consumerSecret).toString('base64');
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic ' + auth
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Initiate STK Push
async function initiateSTKPush(phone, amount, accountReference, description) {
  try {
    const accessToken = await getAccessToken();
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(shortCode + passKey + timestamp).toString('base64');

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: 'https://your-callback-url.com/callback',
        AccountReference: accountReference,
        TransactionDesc: description
      },
      {
        headers: {
          'Authorization': 'Bearer ' + accessToken,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error initiating STK Push:', error.response ? error.response.data : error.message);
    throw error;
  }
}
\`\`\`

### 2. Setting Up Stripe

\`\`\`javascript
// Install Stripe
// npm install @stripe/stripe-js @stripe/react-stripe-js

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

// Create a payment intent
const { paymentIntent, error } = await fetch('/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] })
}).then(res => res.json());
\`\`\`

### 3. Collecting Payment Details

\`\`\`jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // Send paymentMethod.id to your server
      const { paymentIntent, error } = await handlePayment(paymentMethod.id);
      // Handle success or error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
\`\`\`

## Server-Side Implementation (Node.js)

\`\`\`javascript
// Install required packages
// npm install express stripe body-parser cors dotenv

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(require('body-parser').text());
app.use(require('cors')());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // amount in cents
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
\`\`\`

## Security Best Practices

1. **Never store sensitive data**
   - Don't store full card numbers or CVV on your servers
   - Use payment processor tokens instead of raw card data

2. **Use HTTPS**
   - Encrypt all data in transit
   - Implement HSTS for added security

3. **Regular security audits**
   - Conduct regular security assessments
   - Stay updated with PCI DSS requirements

4. **Implement webhook verification**
   - Verify webhook signatures
   - Use idempotency keys to prevent duplicate processing

## Testing Your Integration

### Test Cards
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- **3D Secure Required**: 4000 0025 0000 3155
- **Insufficient Funds**: 4000 0000 0000 9995

### Testing Scenarios
1. Successful payment
2. Failed payment (insufficient funds, declined card)
3. 3D Secure authentication
4. Refunds and disputes

## Common Issues and Troubleshooting

### MPesa Specific
- **Timeout Errors**: Ensure your server can reach MPesa's API endpoints
- **Invalid Credentials**: Double-check your API credentials and shortcode
- **Callback Failures**: Verify your callback URL is accessible from the internet

### General Payment Issues
- **CORS Errors**: Configure your server to accept requests from your frontend domain
- **Authentication Failures**: Ensure API keys are correctly set in environment variables
- **Webhook Timeouts**: Make sure your webhook endpoint responds within the timeout period

## Conclusion

Payment gateway integration requires careful attention to security, error handling, and user experience. Always test thoroughly in sandbox environments before going live, and stay updated with the latest security standards and best practices.

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [MPesa API Documentation](https://developer.safaricom.co.ke/)
- [PCI Security Standards](https://www.pcisecuritystandards.org/)
- [OWASP Payment Security Guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Payment_Processing_Cheat_Sheet.html)

## Need Help?

If you encounter any issues or need assistance with your payment integration, feel free to reach out to our support team or consult with a payment integration specialist.

Remember to always stay updated with the latest security standards and regularly audit your payment flows to ensure compliance and security.`,
    author: 'Borangi Payments Team',
    role: 'Payment Integration Specialists',
    bio: 'Our payment integration team specializes in secure and efficient payment processing solutions for businesses of all sizes.',
    date: '2025-10-15',
    readTime: '20 min read',
    tags: ['payment', 'stripe', 'mpesa', 'integration', 'security']
  },
  // Add other articles here
};

// Component to render a single knowledge base article
const KnowledgeBaseArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = React.useState<Article | null>(null);

  useEffect(() => {
    // In a real app, you would fetch the article content from an API
    if (slug && articleContent[slug]) {
      setArticle(articleContent[slug]);
    } else {
      // Handle 404
      console.error('Article not found');
    }
  }, [slug]);

  // Render loading state
  if (!article) {
    return (
      <div className="knowledge-base-article loading">
        <div className="container">
          <div className="article-header">
            <div className="back-button">
              <Link to="/knowledge-base" className="btn btn-outline-primary">
                <FaArrowLeft /> Back to Articles
              </Link>
            </div>
            <h1>Loading article...</h1>
          </div>
        </div>
      </div>
    );
  }

  // Custom renderer for code blocks
  const components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div className="knowledge-base-article">
      <div className="container">
        <div className="article-header">
          <div className="back-button">
            <Link to="/knowledge-base" className="btn btn-outline-primary">
              <FaArrowLeft /> Back to Articles
            </Link>
          </div>
          <span className="category-badge">{article.category}</span>
          <h1>{article.title}</h1>
          <p className="lead">{article.description}</p>
          <div className="article-meta">
            <div className="author-info">
              <div className="author-details">
                <span className="author-name">{article.author}</span>
                <span className="author-role">{article.role}</span>
              </div>
            </div>
            <div className="article-details">
              <span className="date">{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="read-time">{article.readTime}</span>
            </div>
          </div>
        </div>

        <div className="article-content">
          <ReactMarkdown components={components}>
            {article.content}
          </ReactMarkdown>
        </div>

        <div className="article-footer">
          <div className="tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <div className="article-actions">
            <button className="btn btn-outline-secondary">
              <i className="far fa-bookmark"></i> Save for later
            </button>
            <button className="btn btn-primary">
              <i className="far fa-thumbs-up"></i> Helpful
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseArticle;
