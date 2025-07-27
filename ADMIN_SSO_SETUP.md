# Admin SSO & Separate Domain Setup

## 🏢 Production Admin System Recommendations

### 1. **Separate Admin Domain**
```
Main App: https://skillbridge.com
Admin Portal: https://admin.skillbridge.com
```

**Benefits:**
- ✅ Complete separation of concerns
- ✅ Different security policies
- ✅ Easier to secure and monitor
- ✅ Professional appearance

### 2. **Single Sign-On (SSO) Options**

#### **Option A: AWS SSO (Recommended)**
```javascript
// AWS SSO Integration
import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';

const ssoConfig = {
  region: 'us-east-1',
  userPoolId: 'us-east-1_ADMIN_POOL',
  clientId: 'admin-client-id',
  domain: 'skillbridge-admin.auth.us-east-1.amazoncognito.com'
};
```

#### **Option B: Google Workspace SSO**
```javascript
// Google SSO for company employees
const googleSSOConfig = {
  clientId: 'your-google-client-id',
  hostedDomain: 'skillbridge.com', // Only company emails
  scope: 'openid email profile'
};
```

#### **Option C: Microsoft Azure AD**
```javascript
// Azure AD for enterprise
const azureConfig = {
  clientId: 'azure-client-id',
  authority: 'https://login.microsoftonline.com/your-tenant-id',
  redirectUri: 'https://admin.skillbridge.com/auth/callback'
};
```

### 3. **Implementation Steps**

#### **Phase 1: Separate Admin Domain**
1. **Deploy admin app** to `admin.skillbridge.com`
2. **Configure DNS** and SSL certificates
3. **Update CORS** settings for API access
4. **Set up monitoring** and logging

#### **Phase 2: SSO Integration**
1. **Choose SSO provider** (AWS SSO recommended)
2. **Configure identity provider** in AWS Cognito
3. **Update admin authentication** flow
4. **Test with company employees**

#### **Phase 3: Security Hardening**
1. **IP whitelisting** for admin domain
2. **VPN requirement** for admin access
3. **Multi-factor authentication** (MFA)
4. **Session management** and timeouts

### 4. **Code Changes for Production**

#### **Admin Domain Detection**
```javascript
// utils/adminConfig.js
export const isAdminDomain = () => {
  return window.location.hostname === 'admin.skillbridge.com';
};

export const getAdminConfig = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      domain: 'admin.skillbridge.com',
      ssoEnabled: true,
      provider: 'aws-sso'
    };
  }
  return {
    domain: 'localhost:3000',
    ssoEnabled: false,
    provider: 'local'
  };
};
```

#### **SSO Authentication Flow**
```javascript
// components/SSOLogin.js
import { Auth } from 'aws-amplify';

const SSOLogin = () => {
  const handleSSOLogin = async () => {
    try {
      await Auth.federatedSignIn({
        provider: 'Google', // or 'SAML' for enterprise
        customState: 'admin-access'
      });
    } catch (error) {
      console.error('SSO login failed:', error);
    }
  };

  return (
    <button onClick={handleSSOLogin}>
      Sign in with Company SSO
    </button>
  );
};
```

### 5. **Security Best Practices**

#### **Network Security**
- ✅ **VPN-only access** to admin domain
- ✅ **IP whitelisting** for office/remote IPs
- ✅ **WAF rules** for admin endpoints
- ✅ **DDoS protection** via CloudFlare

#### **Authentication Security**
- ✅ **MFA required** for all admin accounts
- ✅ **Session timeouts** (30 minutes idle)
- ✅ **Device registration** for trusted devices
- ✅ **Audit logging** for all admin actions

#### **Data Protection**
- ✅ **Encrypted data** at rest and in transit
- ✅ **Role-based permissions** (super admin, reviewer, etc.)
- ✅ **Data access logging** and monitoring
- ✅ **Regular security audits**

### 6. **Deployment Architecture**

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Users         │    │   Employees      │    │   Admin Panel   │
│   skillbridge   │    │   Company SSO    │    │   admin.skill   │
│   .com          │    │   Google/Azure   │    │   bridge.com    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ Public  │              │ SSO   │              │ Admin   │
    │ ALB     │              │ IdP   │              │ ALB     │
    └─────────┘              └───────┘              └─────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐              ┌───▼───┐              ┌────▼────┐
    │ Public  │              │ AWS   │              │ Private │
    │ ECS     │              │ SSO   │              │ ECS     │
    └─────────┘              └───────┘              └─────────┘
```

### 7. **Cost Considerations**

- **AWS SSO**: $0.015 per user per month
- **Separate domain**: ~$12/year for domain + SSL
- **Additional ALB**: ~$20/month
- **VPN setup**: ~$50/month for site-to-site VPN

**Total estimated cost**: ~$100/month for enterprise admin security

### 8. **Migration Timeline**

- **Week 1-2**: Set up separate admin domain
- **Week 3-4**: Implement SSO integration
- **Week 5-6**: Security hardening and testing
- **Week 7**: Employee training and rollout
- **Week 8**: Monitor and optimize

This approach provides enterprise-grade security while maintaining ease of use for authorized administrators.