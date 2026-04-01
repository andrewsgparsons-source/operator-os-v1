# Supabase Setup Guide (Complete Newbie Version)

**Time needed:** 3-5 minutes  
**What you'll get:** A DATABASE_URL that both James and Andy can connect to

---

## Step 1: Create Supabase Account

1. Open your browser and go to: **https://supabase.com**

2. Click the green **"Start your project"** button (top right)

3. Click **"Sign in with GitHub"** (or email if you prefer)

4. If using GitHub: Click **"Authorize Supabase"**

5. You'll see the Supabase dashboard

---

## Step 2: Create New Project

1. Click the green **"New project"** button

2. Fill in the form:
   - **Name:** `operator-os-db` (or anything you like)
   - **Database Password:** Click the **"Generate a password"** button  
     ⚠️ **IMPORTANT:** Copy this password somewhere safe - you'll need it!
   - **Region:** Choose closest to you (e.g., "Europe West (London)")
   - **Pricing Plan:** Leave as **"Free"** (it's selected by default)

3. Click **"Create new project"**

4. Wait 1-2 minutes while Supabase sets up your database  
   (You'll see a progress screen - just wait)

---

## Step 3: Enable pgvector Extension

1. Once the project is ready, look at the left sidebar

2. Click **"Database"** (it has a database icon)

3. Click **"Extensions"** (it's a sub-menu under Database)

4. In the search box, type: `vector`

5. Find **"vector"** in the list (it says "vector similarity search for Postgres")

6. Click the toggle switch on the right to turn it **ON** (it should turn green)

7. Wait a few seconds - you'll see a success message

---

## Step 4: Get Your Connection String

1. In the left sidebar, click **"Settings"** (gear icon at the bottom)

2. Click **"Database"** (under Settings)

3. Scroll down to **"Connection string"**

4. You'll see tabs: **Pooler**, **Session**, **Direct**  
   Click **"URI"** (not Pooler)

5. You'll see a connection string that looks like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@[HOST]/postgres
   ```

6. Click the **"Copy"** button next to it

7. ⚠️ **IMPORTANT:** The password part will show `[YOUR-PASSWORD]`  
   You need to replace this with the actual password from Step 2!

   **Example:**
   - What you copied: `postgresql://postgres.abcd1234:[YOUR-PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`
   - What you need: `postgresql://postgres.abcd1234:your_actual_password_here@aws-0-eu-west-1.pooler.supabase.com:5432/postgres`

---

## Step 5: Send the Connection String to James

1. Replace `[YOUR-PASSWORD]` in the connection string with your actual password

2. Send it to me (James) via Telegram with this format:
   ```
   DATABASE_URL=postgresql://postgres.abcd1234:actual_password@aws-0-eu-west-1.pooler.supabase.com:5432/postgres
   ```

3. **Also share this with Andy** - he needs the same connection string so all agents can use the same database

---

## ✅ What Happens Next

Once I have the DATABASE_URL:

1. I'll create a `.env` file with it
2. I'll build and run the MCP server
3. I'll test all three tools (`memory_add`, `memory_search`, `decision_log`)
4. I'll report back with test results
5. Andy can do the same on his machine

---

## 🔒 Security Notes

- This connection string is sensitive (it has your password in it)
- Only share it with trusted agents (James, Andy)
- Don't post it publicly on GitHub or forums
- The free tier is limited to 500MB storage and 2GB bandwidth/month (more than enough for testing)

---

## ❓ Troubleshooting

**"I can't find the vector extension"**
- Make sure you clicked Database → Extensions in the left sidebar
- Try refreshing the page
- The extension should be called "vector" (lowercase)

**"My password doesn't work"**
- Make sure you copied the exact password from Step 2
- Passwords are case-sensitive
- If you lost it, you can reset it in Settings → Database → Database password

**"The connection string looks weird"**
- It should start with `postgresql://`
- It should have `@` in the middle
- It should end with `/postgres`
- Example: `postgresql://postgres.abc123:mypass@host.supabase.com:5432/postgres`

---

## 📞 Need Help?

If you get stuck, just send me a screenshot of where you are and I'll guide you through it!
