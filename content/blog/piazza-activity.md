---
title: Tracking Piazza Activity
description: Writing a script to monitor the number of users online on my class' Piazza forum over time
date: 2021-04-26
tags: [programming, scripting]
---

Prompted by an offhand remark about patterns in the number of users online on my CS class's [Piazza](https://en.wikipedia.org/wiki/Piazza_(web_service)) forum, I wrote a script to track just that. The hypothesis was, of course, that the number of users online spikes just before exams and homework deadlines.

{{< figure src="/img/piazza-activity/online-now.png" caption="The number of online users is featured in the Piazza footer" >}}

Conveniently, Piazza makes frontend HTTP requests to retrieve the number of online users rather than rendering it on the backend.

{{< figure src="/img/piazza-activity/post-request-get-online-users.png" caption="The request that fetches the number of online users" >}}

Firefox Dev Tools lets us directly copy cURL commands for requests.

```sh
curl 'https://piazza.com/logic/api?method=network.get_online_users&aid=************' \
	-H 'User-Agent: ************' \
	-H 'Accept: application/json, text/javascript, */*; q=0.01' \
	-H 'Accept-Language: en-US,en;q=0.5' --compressed \
	-H 'Referer: https://piazza.com/class/*************?cid=****'\
	-H 'Content-Type: application/json; charset=utf-8' \
	-H 'CSRF-Token: ************************' \
	-H 'X-Requested-With: XMLHttpRequest' \
	-H 'Origin: https://piazza.com' \
	-H 'DNT: 1' \
	-H 'Connection: keep-alive' \
	-H 'Cookie: session_id=************************; piazza_session=[…]; last_piaz_user=**************; AWSELB=[…]; AWSELBCORS=[…]' \
	-H 'Cache-Control: max-age=0' \
	--data-raw '{"method":"network.get_online_users","params":{"nid":"*************","uid":"**************"}}'
```

The response was of the form:

```json
{"result":{"users":25},"error":null,"aid":"************"}
```

Using some trial and error, I found which HTTP request headers weren't strictly necessary and left most of them out.

I then wrote a small script that retrieves the online user count and appends it—with a unix timestamp—to a csv file.

```fish
#!/usr/bin/env fish

set rn (date +%s)
set users (curl -s 'https://piazza.com/logic/api?method=network.get_online_users&aid=************' \
    -H 'CSRF-Token: ************************' \
    -H 'DNT: 1' \
    -H 'Cookie: session_id=************************; piazza_session=[…]; last_piaz_user=**************' \
    -H 'Cache-Control: max-age=0' \
    --data-raw '{"method":"network.get_online_users","params":{"nid":"*************","uid":"**************"}}' \
	| jq '.result.users')

echo "$rn, $users" >> /home/shreyas/comp182-piazza-online.csv
```

I added a crontab entry to run the script every 30 minutes.

```txt
0,30 * * * * /home/shreyas/bin/comp182-piazza-online.fish
```

```txt
1615179608, 56
1615181403, 33
1615183203, 24
1615186802, 13
1615185003, 20
1615188922, 15
1615190402, 12
1615192203, 10
1615194002, 7
[…]
```

Unfortunately, my script broke two weeks in, and all data points after that were just `null`. I assume that the session tokens I used in my script expired, as I had initially anticipated. I didn't realize this until a month later, so I was able to collect only two weeks worth of data.

Anyway, here's a plot of the data that I did collect:

{{< figure src="/img/piazza-activity/comp182-piazza-activity.png" caption="Number of Users Online versus Time" >}}

The partially-captured spike at the beginning coincides with a homework deadline. We had a homework due on March 14 and a midterm on March 15, which are probably responsible for the big spike in the middle. We received midterm solutions on 18 March and midterm grades on 22 March.

Here are the GNUPlot commands I used to create the plot:

```gnuplot
set datafile separator ","
set xdata time
set timefmt "%s"

set title "COMP 182 Piazza Activity"
set ylabel "Number of Users Online"

set style data lines
set format x "%d %b"

set xrange [1615130000:1616385603]
set yrange [0:225]

set key off
set tics nomirror
set border 3 # 0b11

plot "comp182-piazza-online.csv" using ($1+(-6*3600)):2 # UTC-6 hack
```

Notice that I didn't bother correcting for Daylight Savings Time, which came into effect on March 14.

---

While the expired token stuff was disappointing, this was a fun little project. It's always nice to collect data to verify estimates.
