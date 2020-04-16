from rest_framework import serializers

from charityprojects.models import CharityProjects, VolunteerTime, ProjectUserDetails, LearnNewSkill, \
    DevelopNewHabit, GiveDonation, Fundraise, ProjectUser, UserInvitation
from prize.api.serializers import PrizeSerializer
from prize.models import Prize


class ProjectUserDetailsSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    prize = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=Prize.objects.all())

    class Meta:
        model = ProjectUserDetails
        fields = ('project_user', 'video', 'prize')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"video": video})
            else:
                result.update({"video": ""})
        return result


class LearnNewSkillSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = LearnNewSkill
        fields = ('new_skill', 'description', 'video', 'project_user')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"video": video})
            else:
                result.update({"video": ""})
        return result


class VolunteerTimeSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = VolunteerTime
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'volunteer_hours', 'volunteer_work_description', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class DevelopNewHabitSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = DevelopNewHabit
        fields = ('new_habit', 'description', 'video', 'project_user')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"video": video})
            else:
                result.update({"video": ""})
        return result


class GiveDonationSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = GiveDonation
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'donation_details', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class FundraiserSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Fundraise
        fields = ('project_user', 'organisation_name', 'organisation_address',
                  'organisation_city', 'organisation_state', 'organisation_website',
                  'fundraise_details', 'fundraise_amount', 'exp_video')

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('exp_video')
            result.pop('project_user')
            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"exp_video": video})
            else:
                result.update({"exp_video": ""})
        return result


class CharityProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CharityProjects
        fields = '__all__'
        read_only_fields = ['id']

    @property
    def data(self):
        result = super().data
        request_here = self.context.get('request')
        if request_here:
            video = result.pop('video')
            badge = result.pop('badge')
            banner = result.pop('banner')

            if video:
                video = request_here.build_absolute_uri(video)
                result.update({"video": video})
            else:
                result.update({"video": ""})

            if badge:
                badge = request_here.build_absolute_uri(badge)
                result.update({"badge": badge})
            else:
                result.update({"badge": ""})

            if banner:
                banner = request_here.build_absolute_uri(banner)
                result.update({"banner": banner})
            else:
                result.update({"banner": ""})
        return result


class ProjectUserSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    project = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = ProjectUser
        fields = '__all__'
        read_only_fields = ['id']


class ProjectUserDetailsNestedSerializer(serializers.ModelSerializer):
    project_user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    prize = PrizeSerializer(many=False)

    class Meta:
        model = ProjectUserDetails
        fields = ('project_user', 'video', 'prize')


class ProjectUserNestedSerializer(serializers.ModelSerializer):
    project = CharityProjectSerializer(many=False)
    pu_details = ProjectUserDetailsNestedSerializer(read_only=True, many=True)

    class Meta:
        model = ProjectUser
        fields = ['project', 'invited_by', 'date_joined', 'date_started', 'goal_date',
                  'adventure_id', 'challenge_status', 'project_status', 'pu_details']

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data:
            pu_details_data = data.pop('pu_details')[0]
            request_here = self.context.get('request')

            if 'prize' in pu_details_data:
                prize_data = pu_details_data.pop('prize')
                if prize_data:
                    prize = request_here.build_absolute_uri(prize_data.pop('image'))
                else:
                    prize = ""
                data.update({"prize_image": prize})

            if 'video' in pu_details_data:
                video_data = pu_details_data.pop('video')
                if video_data:
                    data.update({"video": request_here.build_absolute_uri(video_data)})
                else:
                    data.update({"video": ""})
        return data


class UserInvitationNestedSerializer(serializers.ModelSerializer):
    inviter_user_email = serializers.SerializerMethodField(read_only=True)
    inviter_user_name = serializers.SerializerMethodField(read_only=True)
    project = CharityProjectSerializer(many=False)

    def get_inviter_user_email(self, obj):
        return obj.friend.email

    def get_inviter_user_name(self, obj):
        return obj.friend.first_name

    class Meta:
        model = UserInvitation
        fields = ['inviter_user_email', 'inviter_user_name', 'status', 'invitation_message',
                  'invitation_date', 'project']