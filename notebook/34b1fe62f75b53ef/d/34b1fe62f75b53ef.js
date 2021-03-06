// https://observablehq.com/d/34b1fe62f75b53ef@669
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer("start")).define("start", function(){return(
new Date('2019-05-13T04:00:00')
)});
  main.variable(observer("today")).define("today", function(){return(
new Date()
)});
  main.variable(observer("past_weeks")).define("past_weeks", ["today","start"], function(today,start)
{
  let output = []
  const weeks_since_start = Math.floor((today - start) / (3600 * 1000 * 24 * 7)) + 1
  for(let i = 1; i < weeks_since_start; i++) {
    output.push((i < 10) ? `0${i}` : `${i}`)
  }
  return output
}
);
  main.variable(observer("week_id")).define("week_id", ["today","start"], function(today,start)
{
  const weeks_since_start = Math.floor((today - start) / (3600 * 1000 * 24 * 7)) + 1
  return (weeks_since_start < 10) ? `0${weeks_since_start}` : `${weeks_since_start}`
}
);
  main.variable(observer("last_week_id")).define("last_week_id", ["today","start"], function(today,start)
{
  const weeks_since_start = Math.floor((today - start) / (3600 * 1000 * 24 * 7)) 
  return (weeks_since_start < 10) ? `0${weeks_since_start}` : `${weeks_since_start}`
}
);
  main.variable(observer()).define(["html","mileage"], function(html,mileage){return(
html`${mileage}`
)});
  main.variable(observer("update_time")).define("update_time", ["d3"], function(d3){return(
d3.text('https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/update_time.txt')
)});
  main.variable(observer("total_fund_raised")).define("total_fund_raised", ["a"], function(a){return(
`$${a.amount.toLocaleString()}`
)});
  main.variable(observer("total")).define("total", ["d3"], function(d3){return(
d3.json('https://raw.githubusercontent.com/mocaspike150/donation/master/data/total.json')
)});
  main.variable(observer("current_week_number")).define("current_week_number", ["week_id"], function(week_id){return(
parseInt(week_id)
)});
  main.variable(observer("fund_goal")).define("fund_goal", function(){return(
500000
)});
  main.variable(observer("progress_bar")).define("progress_bar", function(){return(
(amount, fund_goal) =>  {
  const percent = parseInt((amount/fund_goal) * 100)
  return`
<style>
#progress {
    background: #eee;
    border-radius: 13px;
    height: 20px;
    width: 500px;
    padding: 3px;
}
@media only screen and (max-width: 991px) {
    #progress{
    width: 320px;
  }
}

#progress:after {
    content: '';
    display: block;
    background: #ffa10a;
    width: ${percent}%;
    height: 100%;
    border-radius: 9px;
}
</style>
<div class="subtitle3" style="margin-top:5px">Fundraising Campaign Progress: ${percent}% of $${fund_goal.toLocaleString()}</div>
<div id="progress"></div>
`
}
)});
  main.variable(observer("railroad_completed")).define("railroad_completed", ["number_of_tracks"], function(number_of_tracks){return(
`
<div class="subtitle2" style="margin-top:-15px">Number of Railroads Completed *</div>
<div class="subtitle_num2">${number_of_tracks}
</div>
`
)});
  main.variable(observer()).define(["html","style"], function(html,style){return(
html`${style}`
)});
  main.variable(observer("style")).define("style", function(){return(
`
<style>
 .subtitle {
    font-size: 18px;
    font-family: Verlag-bold;
    line-height: 1;
    padding-top:10px
}
 .subtitle_num {
    font-family: Verlag-bold;
    color: #63bf87;
    font-size: 32px;
}
 #railroad{
  height: 150px;
  margin-top: 10px;
}
 @media only screen and (max-width: 991px) {
    #railroad{
    margin-top: -50px;
}
}
.subtitle2{
    font-family: Verlag-bold;
    font-size: 16px;
    line-height: 1;
    padding-bottom:5px;
}
 .subtitle_num2 {
    font-family: Verlag-bold;
    color: #63bf87;
    font-size: 32px;
    line-height: 0.9;
    padding-bottom: 10px;
}
 .footnote_link {
    font-size: 15px;
     font-family: Verlag-bold;
}
 .footnote {
    font-size: 14px;
    font-style: italic;
}

.subtitle3{
    font-family: Verlag-bold;
    font-size: 15px;
    line-height: 1;
    padding-bottom:5px;
  
}


</style>
`
)});
  main.variable(observer("current_mileage")).define("current_mileage", ["num_current_mileage"], function(num_current_mileage){return(
`
<div style="width:160px; margin-top:-80px; margin-left: auto;padding-right:10px">
<div class="subtitle" style="text-align:right;">Total Mileage</div>
<div class="subtitle_num" style="text-align:right;">${num_current_mileage.toLocaleString()}</div>
</div>
`
)});
  main.variable(observer("num_current_mileage")).define("num_current_mileage", ["number_of_tracks","track_length","a"], function(number_of_tracks,track_length,a){return(
number_of_tracks * track_length + a.miles
)});
  main.variable(observer("num_total_mileage")).define("num_total_mileage", ["num_current_mileage"], function(num_current_mileage){return(
num_current_mileage
)});
  main.variable(observer("title")).define("title", function(){return(
`
<div style="font-family: Verlag-bold; color: #ffa10a; font-size: 30px;">Spike 150 Virtual Relay</div>
`
)});
  main.variable(observer("current_week")).define("current_week", ["week_id"], function(week_id){return(
parseInt(week_id)
)});
  main.variable(observer("mileage")).define("mileage", ["title","progress_bar","a","fund_goal","total_fund_raised","current_mileage","build","railroad_completed","mileage_by_clubs","leaderboard_link","footnote"], function(title,progress_bar,a,fund_goal,total_fund_raised,current_mileage,build,railroad_completed,mileage_by_clubs,leaderboard_link,footnote)
{
  return `
<div style="background: #FFF7ED; padding:20px; width:100%">
<div style="margin: 0 10px">
${title}
${progress_bar(a.amount, fund_goal)}
<div class="subtitle" >
Total Raised* <span class=subtitle3>(<a href="/donate/">Donate</a>)</span></div> 
<div class="subtitle_num">${total_fund_raised}</div> 

${current_mileage}

<div id="railroad" >
${build(a.miles)}
</div>
${railroad_completed}
${mileage_by_clubs}

${leaderboard_link}
${footnote}


</div>

`
}
);
  main.variable(observer("mileage_by_clubs")).define("mileage_by_clubs", ["current_week","team_miles","week_id"], function(current_week,team_miles,week_id){return(
`<div>
<div class="subtitle2" >Week ${current_week} Mileage by Clubs</div>
${team_miles(week_id)}
</div>
`
)});
  main.variable(observer("leaderboard_link")).define("leaderboard_link", function(){return(
`<div class="footnote_link" style="padding-top:15px;">
<a href="/spike-relay/leaderboard/">Current Week Leaderboard</a> | <a href="https://spike150.mocanyc.org/spike-relay/scorecard/list">Past Scorecards</a>
</div>
`
)});
  main.variable(observer("footnote")).define("footnote", function(){return(
`
<div class='footnote'>* The total amount is being raised by MOCA Spike 150 <a href="/spike-150-ambassadors/">ambassadors</a> and <a href="/spike-150-clubs/">relay teams</a>, thank you!</div>
<div class='footnote'>* Length of First Transcontinental Railroad: 1,776 miles (<a href="/posts/2019-05-17-15-Facts">more facts</a>)</div>
`
)});
  main.variable(observer("base_miles")).define("base_miles", ["past_weeks","week"], function(past_weeks,week)
{
  let total = 0
  for (let id of past_weeks) {
  for (let team of week[id].teams){
    total += team.mile
  }
  }
  return total
}
);
  main.variable(observer("number_of_tracks")).define("number_of_tracks", ["weekly_miles","current_week_number","base_miles","track_length"], function(weekly_miles,current_week_number,base_miles,track_length){return(
Math.floor((weekly_miles(current_week_number) + base_miles) / track_length)
)});
  main.variable(observer("a")).define("a", ["weekly_miles","current_week_number","base_miles","track_length","total","Promises"], async function*(weekly_miles,current_week_number,base_miles,track_length,total,Promises)
{
  const miles = (weekly_miles(current_week_number) + base_miles ) % track_length ;
  const amount = total.amount;
  for(let i = 0; i < 100; i++) {
    await Promises.delay(0.5);
    yield {
      miles: Math.floor(i * miles / 100),
      amount: Math.floor(i * amount / 100)
    }
  }
  yield { 
    miles: miles, 
    amount: amount 
  } ;
}
);
  main.variable(observer("mile")).define("mile", ["mile_data"], function(mile_data){return(
mile_data.mile
)});
  main.variable(observer("mile_data")).define("mile_data", ["weekly_miles","current_week_number"], function(weekly_miles,current_week_number){return(
{ mile: weekly_miles(current_week_number) }
)});
  main.variable(observer("weekly_miles")).define("weekly_miles", ["week","club_miles"], function(week,club_miles){return(
(week_num) => {
  let total = 0;
  let week_id = week_num < 10 ? `0${week_num}` : week_num;
  let teams = week[week_id].teams;
  for(let team of teams) {
    total += club_miles(team.id)
  }
  return total
}
)});
  main.variable(observer("team_miles")).define("team_miles", ["week","club_miles","avatar"], function(week,club_miles,avatar){return(
(week_id) => {
  let output = `<div>`
  let teams = week[week_id].teams.sort((x, y) => (club_miles(x.id)  <= club_miles(y.id)) ? 1 : -1 )
  const base = 'https://spike150.mocanyc.org/spike-relay/club/club.html'
  for(let team of teams) {
    output += `
<a href="${base}#${team.id}">
<img style="border-radius: 32px; width: 32px; height: 32px; margin: 5px"  src="${avatar[team.id].src}"/>
</a>${club_miles(team.id)} miles
`
  }
  output += `</div>`
  return output
}
)});
  main.variable(observer("week")).define("week", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/relay/week.json')
)});
  main.variable(observer("avatar")).define("avatar", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/club/avatar.json')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  main.variable(observer("track")).define("track", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/json/track.json')
)});
  main.variable(observer("track_length")).define("track_length", function(){return(
1776
)});
  main.variable(observer("build")).define("build", ["track_length","DOM","d3","track","spike_svg","spike_positions"], function(track_length,DOM,d3,track,spike_svg,spike_positions){return(
(mile) => {
  const t = Math.floor(mile * 42 / track_length) % 42
  const svg = DOM.svg(1280, 183)
  svg.style = "width: 100%;"
  const container = d3.select(svg)
  
  let g = container.selectAll('g').data(track).enter().append('g');
  g.attr('fill', 'none')
  g.append('path')
    .attr('d', (d, i) => { return d.path[0] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('path')
    .attr('d', (d, i) => { return d.path[1] })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  g.append('polygon')
    .attr('points', (d, i) => { return d.points })
    .attr('fill', (d, i) => { return (i < t) ? '#64C188' : '#ccc'})
  
  let spike = g.append('g').html(spike_svg.svg);
  spike.attr('transform', (d, i) => { if( i == t - 1) {
    return `translate(${spike_positions[i].x}, ${spike_positions[i].y}) scale(0.3) rotate(${spike_positions[i].angle})`
  } else {
    return 'scale(0)'
  }})
 
  return svg.outerHTML;
}
)});
  main.variable(observer()).define(["club_miles"], function(club_miles){return(
club_miles(187897)
)});
  main.variable(observer("club_miles")).define("club_miles", ["leaderboard"], function(leaderboard){return(
(id) => {
  const km = leaderboard[id].map((d) => (parseFloat(d[2]) ? parseFloat(d[2]) : 0))
  let total = 0
  if(km.length > 0) {
     total = parseInt(km.reduce((x, y) => (x + y)) * 0.621371) 
  }
  return total ? total : 0
}
)});
  main.variable(observer("leaderboard")).define("leaderboard", ["d3"], function(d3){return(
d3.json(`https://raw.githubusercontent.com/mocaspike150/leaderboard/master/data/leaderboard.json`)
)});
  main.variable(observer("spike_svg")).define("spike_svg", ["d3"], function(d3){return(
d3.json('https://spike150.mocanyc.org/api/spike.json')
)});
  main.variable(observer("spike_positions")).define("spike_positions", function(){return(
[
  { x: 35, y: 10, angle: 5 },
  { x: 60, y: 10, angle: 0 },
  { x: 90, y: 15, angle: 0 },
  { x: 125, y: 20, angle: 0 },
  { x: 162, y: 12, angle: 10 },  
  { x: 190, y: 22, angle: 15 },
  { x: 212, y: 28, angle: 0 },
  { x: 247, y: 30, angle: 0 },
  { x: 285, y: 30, angle: 10 },
  { x: 320, y: 45, angle: 25 },
  { x: 340, y: 70, angle: 15 },
  { x: 368, y: 77, angle: 0 },
  { x: 402, y: 75, angle: 0 },
  { x: 437, y: 75, angle: 15 },
  { x: 468, y: 85, angle: 15 },
  { x: 492, y: 90, angle: -6 },
  { x: 524, y: 85, angle: -9 },
  { x: 567, y: 80, angle: 16 },
  { x: 596, y: 92, angle: 10 },
  { x: 622, y: 98, angle: 5 },
  { x: 652, y: 100, angle: -8 },
  { x: 686, y: 95, angle: 5 },
  { x: 716, y: 95, angle: -5 },
  { x: 748, y: 98, angle: -2 },
  { x: 782, y: 98, angle: -8 },
  { x: 810, y: 90, angle: -20 },
  { x: 842, y: 78, angle: 6 },
  { x: 880, y: 85, angle: 25 },
  { x: 902, y: 95, angle: 15 },
  { x: 930, y: 105, angle: 10 },
  { x: 960, y: 115, angle: 10 },
  { x: 985, y: 115, angle: 0 },
  { x: 1010, y: 115, angle: -8 },
  { x: 1038, y: 115, angle: -10 },
  { x: 1067, y: 110, angle: -10 },
  { x: 1097, y: 105, angle: -3 },
  { x: 1126, y: 105, angle: 0 },
  { x: 1158, y: 105, angle: 5 },
  { x: 1184, y: 105, angle: -14 },
  { x: 1200, y: 92, angle: -40 },
  { x: 1225, y: 78, angle: -50 },
  { x: 1235, y: 48, angle: -48 }
]
)});
  return main;
}
