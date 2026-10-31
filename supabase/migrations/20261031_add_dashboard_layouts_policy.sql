create policy "Users can manage their own layout"
on public.dashboard_layouts
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
