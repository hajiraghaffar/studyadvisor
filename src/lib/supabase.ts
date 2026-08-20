import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://uypvmnltdmrivdrpufdz.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjQxMWRlNjdkLWY5YWMtNGM1Mi1iNDhjLTc3YjE4Mzg4NDQ4MyJ9.eyJwcm9qZWN0SWQiOiJ1eXB2bW5sdGRtcml2ZHJwdWZkeiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzczOTM5NzcyLCJleHAiOjIwODkyOTk3NzIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.1adgiJMHdvbvGaUjYpfaBjcASSNdLJab1oBXYz2i31s';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };