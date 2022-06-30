import { Group } from 'src/users/entity/group.entity';
import { User } from 'src/users/entity/user.entity';
import { ViewColumn, ViewEntity } from 'typeorm';
import { Handicap } from './handicap.entity';
import { Score } from './score.entity';

@ViewEntity({
  expression: (connection) =>
    connection
      .createQueryBuilder()
      .select('a.month', 'month')
      .addSelect('a.user_group', 'group')
      .addSelect('a.user_id', 'user_id')
      .addSelect('a.name', 'name')
      .addSelect('a.game1', 'game1')
      .addSelect('a.game2', 'game2')
      .addSelect('a.game3', 'game3')
      .addSelect('a.game4', 'game4')
      .addSelect('a.game5', 'game5')
      .addSelect('a.game6', 'game6')
      .addSelect('a.handi1', 'handi1')
      .addSelect('a.handi2', 'handi2')
      .addSelect('a.handi3', 'handi3')
      .addSelect('a.female_handi', 'female_handi')
      .addSelect('a.this_average', 'this_average')
      .addSelect(
        'a.game1 + a.game2 + a.game3 + a.game4 + a.game5 + a.game6',
        'sum',
      )
      .addSelect(
        `
        case 
        when (a.game1 + a.game2 + a.game3 + a.game4 + a.game5 + a.game6) = 0 then 0
            else (a.game1 + a.game2 + a.game3 + a.game4 + a.game5 + a.game6)
              / (case when a.game1 > 0 then 1 else 0 end 		
              + case when a.game2 > 0 then 1 else 0 end 
              + case when a.game3 > 0 then 1 else 0 end 
              + case when a.game4 > 0 then 1 else 0 end 
              + case when a.game5 > 0 then 1 else 0 end 
              + case when a.game6 > 0 then 1 else 0 end)
        end
      `,
        'avg',
      )
      .addSelect(
        `
       a.game1 + a.game2 + a.game3 + a.game4 + a.game5 + a.game6 + a.handi1 + a.handi2 + a.handi3 + a.female_handi
       `,
        'final_sum',
      )
      .addSelect(
        `
        rank() over(partition by month, user_group order by (a.game1 + a.game2 + a.game3 + a.game4 + a.game5 + a.game6 + a.handi1 + a.handi2 + a.handi3 + a.female_handi) desc)
        `,
        'rank',
      )
      .from((subQuery) => {
        return subQuery
          .select('t2.round_month', 'month')
          .addSelect('t5.group', 'user_group')
          .addSelect('t1.id', 'user_id')
          .addSelect('t1.username', 'name')
          .addSelect('COALESCE(t2.first_game, 0)', 'game1')
          .addSelect('COALESCE(t2.second_game, 0)', 'game2')
          .addSelect('COALESCE(t2.third_game, 0)', 'game3')
          .addSelect('COALESCE(t3.first_game, 0)', 'game4')
          .addSelect('COALESCE(t3.second_game, 0)', 'game5')
          .addSelect('COALESCE(t3.third_game, 0)', 'game6')
          .addSelect('COALESCE(t4.first_handi, 0)', 'handi1')
          .addSelect('COALESCE(t4.second_handi, 0)', 'handi2')
          .addSelect('COALESCE(t4.third_handi, 0)', 'handi3')
          .addSelect(
            `
            case t1.is_female when true 
			        then 15 * (case when COALESCE(t2.first_game, 0) > 0 then 1 else 0 end 		
		  		      + case when COALESCE(t2.second_game, 0) > 0 then 1 else 0 end 
		 		        + case when COALESCE(t2.third_game, 0) > 0 then 1 else 0 end 
				        + case when COALESCE(t3.first_game, 0) > 0 then 1 else 0 end 
				        + case when COALESCE(t3.second_game, 0) > 0 then 1 else 0 end 
		 		        + case when COALESCE(t3.third_game, 0) > 0 then 1 else 0 end)
	 		      else 0 end
            `,
            'female_handi',
          )
          .addSelect('t5.average', 'this_average')
          .from(User, 't1')
          .leftJoin(Score, 't2', "t2.user = t1.id and t2.round = '1'")
          .leftJoin(Score, 't3', "t3.user = t1.id and t3.round = '2'")
          .leftJoin(
            Handicap,
            't4',
            't4.user = t1.id and t2.round_month = t4.handi_month',
          )
          .leftJoin(
            Group,
            't5',
            't5.user = t1.id and t5.group_month = t2.round_month',
          )
          .where('t2.round_month = t3.round_month');
      }, 'a')
      .orderBy('a.month')
      .addOrderBy('a.user_group')
      .addOrderBy('a.name'),
})
export class ScoreView {
  @ViewColumn()
  month: string;

  @ViewColumn()
  group: string;

  @ViewColumn()
  user_id: number;

  @ViewColumn()
  name: string;

  @ViewColumn()
  game1: number;

  @ViewColumn()
  game2: number;

  @ViewColumn()
  game3: number;

  @ViewColumn()
  game4: number;

  @ViewColumn()
  game5: number;

  @ViewColumn()
  game6: number;

  @ViewColumn()
  handi1: number;

  @ViewColumn()
  handi2: number;

  @ViewColumn()
  handi3: number;

  @ViewColumn()
  female_handi: number;

  @ViewColumn()
  this_average: number;

  @ViewColumn()
  sum: number;

  @ViewColumn()
  avg: number;

  @ViewColumn()
  final_sum: number;

  @ViewColumn()
  rank: number;
}
