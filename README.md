#電機四 黃淞楓
	* npm install
	* npm run build
	* npm run start
##Unknown bug:
	- clearCompleted的時候，雖然字體部分是正確的，但勾勾的部分則是保留原先前n個
	- 例如：
	-	* V 1 (completed)
	-	*   2 (not completed)
	-	*	3 (not completed)
	- clearCompleted之後會變：
	-	* V 2 (not completed)
	-	*	3 (not completed)
	- 按一下則變成：
	-	*   2 (completed)
	-	*	3 (not completed)
