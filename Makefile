run-e2e-tests:
	apt-get install -y libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 xvfb
	npm install
	npm run test

compress-backup-data:
	# compressing the tests video files	
	tar -czvf $(BACKUP_NAME) --directory="cypress/videos" e2e

run-tests: run-e2e-tests compress-backup-data
