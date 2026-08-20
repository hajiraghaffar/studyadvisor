echo "Compile studyadvisor.com.pk Start"
git pull

echo "change npm version 22 command start"
nvm use 22

echo "npm run build command start"
npm run build

echo "change npm version 16 command start"
nvm use 16

echo "Update Changes"
git add .
echo "Git Added"
git commit -m "studyadvisor.com.pk updated"
echo "Git Commit"
git push
echo "Git Updated"

echo "Directory Changed"
cd ../../studyadvisorwebapps
echo "Pull work for Live Server"
git pull

echo "Remove old files of studyadvisor.com.pk"
rm -r website/*

echo "Copy new files of studyadvisor.com.pk from studyadvisor.com.pk to cwiztechproject/studyadvisorwebapps/website"
cp -r ../websites/studyadvisor.com.pk/dist/* website

echo "Push work for Live Server"
git add .
echo "Git Added"
git commit -m "studyadvisor.com.pk updated"
echo "Git Commit"
git push
echo "Git Updated"

echo "Live studyadvisor.com.pk"
cd /var/www/studyadvisorwebapps
git pull