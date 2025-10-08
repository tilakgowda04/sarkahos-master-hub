# Admin Setup Guide

## Steps to Create Your First Admin User

1. **Sign up for an account**
   - Visit `/auth` in your app
   - Create a new account with your email and password

2. **Get your User ID**
   - Open the backend dashboard
   - Go to the Authentication section
   - Find your user and copy the User ID (UUID)

3. **Assign Admin Role**
   - In the backend, go to the SQL Editor
   - Run this query (replace `YOUR_USER_ID` with your actual user ID):

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('YOUR_USER_ID', 'admin');
```

4. **Access the Admin Panel**
   - Now you can visit `/admin` to manage destinations and tours
   - You'll see options to add, edit, and delete destinations and tours

## Admin Features

- **Destinations Management**: Add travel destinations with details like name, description, price, duration, and images
- **Tours Management**: Create tour packages linked to destinations
- **Role-Based Access**: Only users with admin role can access the admin panel

## Security Note

The admin system uses:
- Row Level Security (RLS) policies to protect data
- Server-side role verification using security definer functions
- Session-based authentication through Supabase Auth
